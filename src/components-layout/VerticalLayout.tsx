import * as React from "react";
import {Command} from "../types";
import {ReactMde} from "../ReactMde";
import {MdePreview, MdeEditor, ReactMdeToolbar, MarkdownHelp} from "../components";
import {LayoutProps} from "../types/LayoutProps";

export class VerticalLayout extends React.Component<LayoutProps, {}> {

    editorRef: MdeEditor;
    previewRef: MdePreview;

    /**
     * Handler for the textArea value change
     * @memberOf ReactMde
     */
    handleMdeStateChange = (value) => {
        const {onChange} = this.props;
        onChange(value);
    }

    handleCommand(command: Command) {
        const { onCommand } = this.props;
        onCommand(command);
    }

    /**
     * Renders react-mde
     * @returns
     * @memberOf ReactMde
     */
    render() {

        const { commands, mdeEditorState } = this.props;

        return (
            <div className="vertical-layout">
                <ReactMdeToolbar
                    commands={commands}
                    onCommand={this.handleCommand}
                />
                <MdeEditor
                    editorRef={(c) => this.editorRef = c}
                    onChange={this.handleMdeStateChange}
                    editorState={mdeEditorState}
                />
                <MdePreview
                    previewRef={(c) => this.previewRef = c}
                    html={mdeEditorState.html}
                />
                <div className="mde-help">
                    <MarkdownHelp/>
                </div>
            </div>
        );
    }
}
