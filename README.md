# React create component interactive CLI
CLI to create or edit **React** or **React Native** components with your own structure  

- **Plug and play**: Instant config for CRA with typescript
- **Easy to config**: interactive configuration and simple templating
- **Works with anything**: Typescript, Storybook, Redux, Jest, ...
- **Lightweight**: *< 30kb + 3 small libraries*
- **Fast search**: very fast selecting place for new component by dynamic search
- **A lot by one command**: ton of files by multi-creation feature
- **Created for React**: better than **plop**, **hygen** or any scaffolding library, because it's for React
- **Multiplatform**: Works on MacOS, Windows, and Linux.
- ⭐ [**Webstorm integration**](https://github.com/coolassassin/reactcci/blob/master/docs/webstormIntegration.md) ⭐

![Example](https://raw.githubusercontent.com/coolassassin/reactcci/master/readme-example.gif)

[![Tests Status](https://github.com/coolassassin/reactcci/workflows/tests/badge.svg)](https://github.com/coolassassin/reactcci)
[![Build Status](https://img.shields.io/npm/dm/reactcci.svg?style=flat)](https://www.npmjs.com/package/reactcci)
[![Build Status](https://img.shields.io/npm/v/reactcci.svg?style=flat)](https://www.npmjs.com/package/reactcci)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcoolassassin%2Freactcci.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcoolassassin%2Freactcci?ref=badge_shield)

## Quick Overview
Via yarn and interactive mode
```
$ yarn add -D reactcci
$ yarn rcci
```
or via npm and flags
```
$ npm i -D reactcci
$ npx rcci --name Header Body Footer --dest src/App
```

## Installation
To install via npm:  
```npm install --save-dev reactcci```  

To install via yarn:  
```yarn add --dev reactcci```

## Config
On first run CLI will ask you about automatic configuration. Just run a command:  
`npx rcci`  
This command creates file `rcci.config.js` and template folder with basic template set.  

Config file contains next parameters:  
- `folderPath`  
Root directory to place you components, or array of paths  
Default: `src/`  
- `templatesFolder`  
Path to your own components templates  
Default: `templates`  
- `multiProject`  
Allows you to set up config for mono-repository with several projects  
Default: `false`  
- `skipFinalStep`  
Allows you to switch off last checking step  
Default: `false`  
- `templates`  
Object with structure of your component
- `processFileAndFolderName(name, parts, isFolder)`  
Function which allows you to remap your component folder name or filename into something else  
Example:   
    ```javascript
    {
        ...config,
        processFileAndFolderName: (name, parts, isFolder) => 
            isFolder ? name : parts.map((part) => part.toLowerCase()).join('-')
    }
    ```
- `placeholders`  
List of placeholders which you can use to build your own component template  
Default:  
`#NAME#` for a component name  
`#STYLE#` for css-module import  
`#STORY_PATH#` for storybook title
- `afterCreation`  
Object with scripts to process you file after creation  
Default: `undefined`  
Example:  
    ```javascript
    {
        ...config,
        afterCreation: {                
            prettier: {
                extensions: ['.ts', '.tsx'], // optional
                cmd: 'prettier --write [filepath]'
            }
        }
    }
    ```

## Placeholders
Each placeholder is a function which get some data to build your own placeholder.  
During the multiple component creation all functions will be called for every single component.  
Example:
```javascript
placeholders: {
    NAME: ({ componentName }) => componentName
}
```
After this set up you are able to use this placeholder by `#NAME#` inside your template files.  
Below, you can see the list of all available data and functions to create a new one.

| Field | Description |
|---|---|
| `project` | Project name in multy-project mode |
| `componentName`,<br> `objectName` | Name of the component or another object in multi-template mode |
| `objectType` | Type of object which was selected by user. It is `component` by default. |
| `pathToObject` | path to objects folder <br> Example: `src/components` |
| `destinationFolder` | relative path to folder of object which is being created<br>Example: `App/Header/Logo` |
| `objectFolder` | Absolute path to your object (component) folder |
| `relativeObjectFolder` | Relative path to your object (component) folder |
| `files` | Object of files which is being created |
| `getRelativePath(to: string)` | Function to get relative path to any another path<br>Example: `../../src/helpers` |
| `join(...parts: string)` | Function to get joined parts of path. <br>Example:<br> `join(project, destinationFolder, componentName)` => `Project/Footer/Email` |


## Commands
`--update`, `-u` - to update existent component  
`--dest`, `-d` - to set destination path  
`--name`, `-n` - to set a component name or names  
`--project`, `-p` - to set project in multi-project mode  

## Multi-template
If you need to generate something else, not components only, you are able to set up array of templates.  
Example bellow:
```javascript
{
    ...config,
    templates: [
        {
            name: 'component', // will be added to default folderPath folder
            files: {
                index: {
                    name: 'index.ts',
                    file: 'component.ts'
                }
            }
        },
        {
            name: 'service',
            folderPath: 'services/', // will be added by the specific path
            files: {
                index: {
                    name: 'index.ts',
                    file: 'service.ts'
                }
            }
        }
    ]
}
```

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcoolassassin%2Freactcci.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcoolassassin%2Freactcci?ref=badge_large)
