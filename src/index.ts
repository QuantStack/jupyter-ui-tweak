import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IToolbarWidgetRegistry } from '@jupyterlab/apputils';
import { ITranslator } from '@jupyterlab/translation';
import { caretDownIcon } from '@jupyterlab/ui-components';
import { Menu, MenuBar } from '@lumino/widgets';

const FILE_BROWSER_FACTORY = 'FileBrowser';

/**
 * Plugin to add extra commands to the file browser to create
 * new notebooks, files, consoles and terminals
 */
const createNew: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-ui-tweak/tree-extension:new',
  description:
    'Plugin to add extra commands to the file browser to create new notebooks, files, consoles and terminals.',
  requires: [ITranslator],
  optional: [IToolbarWidgetRegistry],
  autoStart: true,
  activate: (
    app: JupyterFrontEnd,
    translator: ITranslator,
    toolbarRegistry: IToolbarWidgetRegistry | null
  ) => {
    const { commands, serviceManager } = app;
    const trans = translator.load('notebook');

    const overflowOptions = {
      overflowMenuOptions: { isVisible: false }
    };
    const menubar = new MenuBar(overflowOptions);
    const newMenu = new Menu({ commands });
    newMenu.title.label = trans.__('New aaa');
    newMenu.title.icon = caretDownIcon;
    menubar.addMenu(newMenu);

    const populateNewMenu = () => {
      // create an entry per kernel spec for creating a new notebook
      const specs = serviceManager.kernelspecs?.specs?.kernelspecs;
      const kernelSpecs = (specs ? Object.values(specs) : []).sort((a, b) => {
        // sort by display name
        if (!b?.display_name) {
          return -1;
        }
        if (!a?.display_name) {
          return 1;
        }
        return a.display_name.localeCompare(b?.display_name);
      });
      for (const spec of kernelSpecs) {
        console.log('adding', spec?.name);
        newMenu.addItem({
          args: { kernelName: spec!.name, isLauncher: true },
          command: 'notebook:create-new'
        });
      }
      console.log('aaaaaaaaaaaa', newMenu, toolbarRegistry);
      const baseCommands = [
        'terminal:create-new',
        'console:create',
        'filebrowser:create-new-file',
        'filebrowser:create-new-directory'
      ];

      baseCommands.forEach(command => {
        newMenu.addItem({ command });
      });
    };

    serviceManager.kernelspecs?.specsChanged.connect(() => {
      newMenu.clearItems();
      populateNewMenu();
    });

    populateNewMenu();

    if (toolbarRegistry) {
      toolbarRegistry.addFactory(
        FILE_BROWSER_FACTORY,
        'new-dropdown',
        (browser: any) => {
          const menubar = new MenuBar(overflowOptions);
          menubar.addMenu(newMenu);
          menubar.addClass('jp-DropdownMenu');
          return menubar;
        }
      );
    }
  }
};

export default [createNew];
