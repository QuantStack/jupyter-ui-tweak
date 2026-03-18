import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IToolbarWidgetRegistry } from '@jupyterlab/apputils';
import { ITranslator } from '@jupyterlab/translation';
import { caretDownIcon, tabIcon } from '@jupyterlab/ui-components';
import { Menu, MenuBar } from '@lumino/widgets';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { getVoilaUrl } from './tools';
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
    newMenu.title.label = trans.__('New');
    newMenu.title.icon = caretDownIcon;
    menubar.addMenu(newMenu);

    const populateNewMenu = () => {
      // create an entry per kernel spec for creating a new notebook
      const specs = serviceManager.kernelspecs?.specs?.kernelspecs;
      const kernelSpecs = (specs ? Object.values(specs) : []).sort((a, b) => {
        // sort by display name
        const nameA = a?.display_name ?? '';
        const nameB = b?.display_name ?? '';
        if (!nameA && !nameB) {
          return 0;
        }
        if (!nameA) {
          return 1;
        }
        if (!nameB) {
          return -1;
        }
        return nameA.localeCompare(nameB);
      });
      for (const spec of kernelSpecs) {
        newMenu.addItem({
          args: { kernelName: spec!.name, isLauncher: true },
          command: 'notebook:create-new'
        });
      }

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

const openInVoila: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-ui-tweak:open-in-voila-plugin',
  description: 'Open notebook in voila',
  autoStart: true,
  requires: [IFileBrowserFactory],
  activate: (app: JupyterFrontEnd, factory: IFileBrowserFactory) => {
    app.commands.addCommand('jupyter-ui-tweak/open-in-voila-command', {
      label: 'Open In Voila',
      caption: 'Open selected notebook in Voila',
      isEnabled: () => true,
      isVisible: () => true,
      icon: tabIcon,
      execute: () => {
        const file = factory.tracker.currentWidget
          ?.selectedItems()
          .next().value;

        if (file) {
          window.open(getVoilaUrl(file.path), '_blank');
        }
      }
    });
  }
};

export default [createNew, openInVoila];
