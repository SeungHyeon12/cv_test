import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AzureOpenAI } from 'openai';
import { SystemPrompt } from './systemPrompts';
import azureConfig from 'src/common/config/azure.config';
import { AIProcessor } from 'src/service/interface/aiProcessor';

@Injectable()
export class AzureAIProcessor implements AIProcessor {
  private readonly client: AzureOpenAI;

  constructor(
    @Inject(azureConfig.KEY)
    private readonly config: ConfigType<typeof azureConfig>,
  ) {
    this.client = new AzureOpenAI({
      endpoint: config.openAIUrl,
      apiKey: config.openAIKey,
      apiVersion: config.openAIVersion,
      deployment: config.openAiDeployName,
    });
  }

  async evaluateStudentEssay(essay: string): Promise<{
    score: number;
    feedback: string;
    highlights: string[];
  }> {
    const response = await this.client.chat.completions.create({
      stream: false,
      messages: [
        { role: 'system', content: SystemPrompt.EVALUATION },
        { role: 'user', content: this.generateUserEssay(essay) },
      ],
      model: 'chatgpt-4o-latest',
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Azure OpenAI response is empty.');
    }

    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch (error) {
      throw new Error(`json format error ${error}`);
    }

    // 값 검증
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('score' in parsed) ||
      !('feedback' in parsed) ||
      !('highlights' in parsed)
    ) {
      throw new Error(
        `requiredFiels(score, feedback, highlights) are not valid.  ${content}`,
      );
    }

    const { score, feedback, highlights } = parsed;

    if (
      typeof score !== 'number' ||
      !Number.isInteger(score) ||
      score < 0 ||
      score > 10
    ) {
      throw new Error(`score is not between 0~10 . current value: ${score}`);
    }

    if (typeof feedback !== 'string') {
      throw new Error(`feedback is not string. current value: ${feedback}`);
    }

    if (
      !Array.isArray(highlights) ||
      !highlights.every((item) => typeof item === 'string')
    ) {
      throw new Error(
        `highlights is not array of stirng. current value: ${JSON.stringify(highlights)}`,
      );
    }

    return { score, feedback, highlights };
  }

  private generateUserEssay(essay: string) {
    return `
user essay:
${essay}
`;
  }
}
