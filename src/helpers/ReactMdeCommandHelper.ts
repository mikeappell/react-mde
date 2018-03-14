import {
    insertText,
    insertBefore,
    insertBeforeEachLine,
    selectCurrentWordIfCaretIsInsideOne,
    insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    insertBreaksAfterSoThatThereIsAnEmptyLineAfter,
} from "./ReactMdeTextHelper";
import { TextSelection, MdeState, AlterLineFunction } from "../types";

/**
 * Helper for creating commands that make lists
 * @export
 * @param {any} text
 * @param {any} selection
 * @param {any} insertionBeforeEachLine
 * @returns
 */
export function makeList(text: string, selection: TextSelection, insertionBeforeEachLine: string | AlterLineFunction): MdeState {
    let textInsertion;

    selection = selectCurrentWordIfCaretIsInsideOne(text, selection);

    // insert breaks before, if needed
    textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore(text, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    // insert breaks after, if needed
    textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter(text, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    // inserts 'insertionBeforeEachLine' before each line
    textInsertion = insertBeforeEachLine(text, insertionBeforeEachLine, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    return {
        text,
        selection,
    };
}

/**
 * Helper for creating a command that makes a header
 * @param {any} text
 * @param {any} selection
 * @param {any} insertionBefore
 * @returns
 */
export function makeHeader(text: string, selection: TextSelection, insertionBefore: string): MdeState {
    selection = selectCurrentWordIfCaretIsInsideOne(text, selection);
    // the user is selecting a word section
    const insertionText = insertBefore(text, insertionBefore, selection, false);
    const newText = insertionText.newText;
    const newSelection = insertionText.newSelection;
    return {
        text: newText,
        selection: newSelection,
    };
}

