import {
    IConfigurationExtend,
    IEnvironmentRead
} from '@rocket.chat/apps-engine/definition/accessors';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SkypeCallingSendCommand } from './commands/SkypeCallingSendCommand';

export class SkypeCallingApp extends App {
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.settings.provideSetting({
            id: 'SkypeCalling_Bot',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'SkypeCalling_Bot',
            i18nDescription: 'SkypeCalling_Bot_Description',
        });

        await configuration.slashCommands.provideSlashCommand(new SkypeCallingSendCommand(this));
    }
}
