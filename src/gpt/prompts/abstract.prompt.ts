export abstract class AbstractPrompt {
    public abstract generatePrompt(data: unknown): string;
}
