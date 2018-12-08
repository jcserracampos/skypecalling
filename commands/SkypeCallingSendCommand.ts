import { ISlashCommand, SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { SkypeCallingApp } from "../SkypeCallingApp";
import { IRead, IModify, IHttp } from "@rocket.chat/apps-engine/definition/accessors";
import { shareLink } from "../lib/ShareLink";

export class SkypeCallingSendCommand implements ISlashCommand {
    public command = 'skype-send-link';
    public i18nParamsExample = 'SkypeCallingSend_Command_Example';
    public i18nDescription = 'SkypeCallingSend_Command_Description';
    public providesPreview = false;


    constructor(private readonly app: SkypeCallingApp) {}

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const skypeId = context.getArguments().slice().join(' ');

        const result = await http.post(`https://is.gd/create.php?format=simple&url=skype:${skypeId}?call`);
        
        await shareLink(result.content, context, read, modify);
    }
}