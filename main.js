/*
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
    "use strict";

    var EditorManager           = brackets.getModule("editor/EditorManager"),
        CommandManager          = brackets.getModule("command/CommandManager"),
        Menus                   = brackets.getModule("command/Menus"),
        AppInit                 = brackets.getModule("utils/AppInit");

    function backToIndentation() {
        var editor  = EditorManager.getFocusedEditor(),
            cursor  = editor.getCursorPos(),
            cm      = editor._codeMirror,
            doc     = cm.doc,
            line    = doc.getLine(cursor.line),
            index   = line.search(/\S/),
            ch      = Math.max(index, 0);

        cm.setCursor({line: cursor.line, ch: ch});
    }
    
    function jumpToHome() {
        var editor  = EditorManager.getFocusedEditor(),
            cm      = editor._codeMirror;

        cm.setCursor({line: 0, ch: 0});
    }

    function jumpToEnd() {
        var editor  = EditorManager.getFocusedEditor(),
            lines   = editor.lineCount(),
            doc     = editor.document,
            cm      = editor._codeMirror,
            lastLine = doc.getLine(lines - 1);

        cm.setCursor({line: lines, ch: lastLine.length});
    }

    AppInit.appReady(function () {
        var NAVIGATE_BACK_TO_INDENTATION = "navigate.back-to-indentation",
            NAVIGATE_TO_HOME = "navigate.jump-to-home",
            NAVIGATE_TO_END = "navigate.jump-to-end",
            CMD_NAVIGATE_BACK_TO_INDENTATION = "Back to Indentation",
            CMD_NAVIGATE_TO_HOME = "Jump to Home",
            CMD_NAVIGATE_TO_END = "Jump to End";

        CommandManager.register(CMD_NAVIGATE_BACK_TO_INDENTATION, NAVIGATE_BACK_TO_INDENTATION, backToIndentation);
        CommandManager.register(CMD_NAVIGATE_TO_HOME, NAVIGATE_TO_HOME, jumpToHome);
        CommandManager.register(CMD_NAVIGATE_TO_END, NAVIGATE_TO_END, jumpToEnd);
        
        var menu = Menus.getMenu(Menus.AppMenuBar.NAVIGATE_MENU);
        menu.addMenuItem(Menus.DIVIDER);
        menu.addMenuItem(NAVIGATE_BACK_TO_INDENTATION, [{key: "Alt-M", platform: "win"},
                                                  {key: "Cmd-Shift-M", platform: "mac"}]);
        menu.addMenuItem(NAVIGATE_TO_HOME, [{key: "Alt-<", platform: "win"},
                                                  {key: "Cmd-<", platform: "mac"}]);
        menu.addMenuItem(NAVIGATE_TO_END, [{key: "Alt->", platform: "win"},
                                                  {key: "Cmd->", platform: "mac"}]);


    });
    
});
