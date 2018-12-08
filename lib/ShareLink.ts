import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export async function shareLink(skype_url: any, context: SlashCommandContext, read: IRead, modify: IModify): Promise<void> {
    const botUsername = await read.getEnvironmentReader().getSettings().getValueById('SkypeCalling_Bot');
    const botUser = await read.getUserReader().getByUsername(botUsername);

    const builder = modify.getCreator().startMessage()
        .setSender(botUser || context.getSender())
        .setRoom(context.getRoom())
        .setUsernameAlias('Skype Calling')
        .setAvatarUrl('https://i.imgur.com/Srp9AUZ.png')
        .setText(`@${context.getSender().username} shared a link to call her/him in Skype: <${skype_url}>`);

    await modify.getCreator().finish(builder);
};