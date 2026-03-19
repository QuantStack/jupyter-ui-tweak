import { ToolbarButton } from '@jupyterlab/apputils';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook';
import { CommandRegistry } from '@lumino/commands';
import { IDisposable } from '@lumino/disposable';
import { launchIcon } from '@jupyterlab/ui-components';

export class VoilaButton implements DocumentRegistry.IWidgetExtension<
  NotebookPanel,
  INotebookModel
> {
  /**
   * Instantiate a new VoilaRenderButton.
   * @param commands The command registry.
   */
  constructor(commands: CommandRegistry) {
    this._commands = commands;
  }

  /**
   * Create a new extension object.
   */
  createNew(panel: NotebookPanel): IDisposable {
    const button = new ToolbarButton({
      tooltip: 'Open with Voilà',
      className: 'jp-tweak-open-in-voila-button',
      icon: launchIcon,
      pressed: false,
      noFocusOnClick: true,
      onClick: () => {
        this._commands.execute('notebook:open-with-voila');
      }
    });
    panel.toolbar.insertAfter('cellType', 'openInVoila', button);
    return button;
  }

  private _commands: CommandRegistry;
}
