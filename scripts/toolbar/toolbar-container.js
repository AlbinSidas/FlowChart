import View from 'Base/view.js';
import tagString from 'Views/toolbar-container.html';
import toolbarStyle from 'Styles/toolbar.css';

class ToolbarContainer extends View {
    constructor() {
        super(tagString);
        this.increaseSizeBtn = null;
    }

    didAttach(parent) {
        super.didAttach(parent);
        this.addStyle(toolbarStyle['tool_bar_contaier']);
    }
}
