import prompts from 'prompts';
import { setPath } from '../src/setPath';
import { componentSettingsMap } from '../src/componentSettingsMap';
import path from 'path';

jest.mock('../src/componentSettingsMap', () => {
    return {
        componentSettingsMap: {
            root: process.cwd(),
            project: '',
            config: {
                folderPath: 'tests',
            },
            commandLineFlags: {
                dest: '',
            },
        },
    };
});

jest.mock('../src/helpers', () => {
    return {
        isDirectory: () => true
    }
})

jest.mock('fs', () => {
    return {
        existsSync: () => true,
        promises: {
            readdir: () => {
                return Promise.resolve(['folder1']);
            }
        }
    }
})

const anyFolderName = 'TestComponent';

const getPath = () => {
    const { projectRootPath, resultPath } = componentSettingsMap;
    return path.join(projectRootPath, resultPath).replace(/\\$/g, '').replace(/\\/g, '/');
};

describe('setPath', () => {
    it('default path', async () => {
        prompts.inject([1]);
        await setPath();

        expect(getPath()).toBe(componentSettingsMap.config.folderPath);
    });

    it('first folder path', async () => {
        prompts.inject([anyFolderName, 1]);
        await setPath();

        expect(getPath()).toBe(`${componentSettingsMap.config.folderPath}/${anyFolderName}`);
    });

    it('first folder and back path', async () => {
        prompts.inject([anyFolderName, -1, 1]);
        await setPath();

        expect(getPath()).toBe(componentSettingsMap.config.folderPath);
    });

    it('manual set', async () => {
        const MANUAL_PATH = 'RA/Static/Scripts';
        componentSettingsMap.commandLineFlags.dest = MANUAL_PATH;

        prompts.inject([1]);
        await setPath();

        expect(getPath()).toBe(MANUAL_PATH);
    });
});