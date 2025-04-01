import UndoGroup from "../../libraries/common/cs/UndoGroup.js";
import { getVariableUsesById, getOrderedTopBlockColumns } from "../../libraries/common/cs/devtools-utils.js";

export default async function ({ addon, console, msg, safeMsg: m }) {
  const blockly = await addon.tab.traps.getBlockly();
  const vm = addon.tab.traps.vm;
  const getWorkspace = () => addon.tab.traps.getWorkspace();

  let originalMsg = blockly.Msg.CLEAN_UP;
  addon.self.addEventListener("disabled", () => (blockly.Msg.CLEAN_UP = originalMsg));
  addon.self.addEventListener("reenabled", () => (blockly.Msg.CLEAN_UP = m("clean-plus")));
  blockly.Msg.CLEAN_UP = m("clean-plus");

  const oldCleanUpFunc = blockly.WorkspaceSvg.prototype.cleanUp;
  blockly.WorkspaceSvg.prototype.cleanUp = function () {
    if (addon.self.disabled) return oldCleanUpFunc.call(this);
    doCleanUp();
  };

  const doCleanUp = () => {
    let workspace = getWorkspace();

    UndoGroup.startUndoGroup(workspace);

    let result = getOrderedTopBlockColumns(true, workspace);
    let columns = result.cols;
    let orphanCount = result.orphans.blocks.length;
    if (orphanCount > 0) {
      let message = msg("orphaned", {
        count: orphanCount,
      });
      if (confirm(message)) {
        for (const block of result.orphans.blocks) {
          block.dispose();
        }
      } else {
        columns.unshift(result.orphans);
      }
    }

    const gridSize = workspace.getGrid().spacing || workspace.getGrid().spacing_; // new blockly || old blockly

    // The coordinates start between the workspace dots
    // but script-snap snaps to them
    let cursorX = gridSize / 2;

    let maxWidths = result.maxWidths;

    for (const column of columns) {
      let cursorY = gridSize / 2;
      let maxWidth = 0;

      for (const block of column.blocks) {
        let xy = block.getRelativeToSurfaceXY();
        if (cursorX - xy.x !== 0 || cursorY - xy.y !== 0) {
          block.moveBy(cursorX - xy.x, cursorY - xy.y);
        }
        let heightWidth = block.getHeightWidth();
        cursorY += heightWidth.height + gridSize;
        cursorY += gridSize - (cursorY + gridSize / 2) % gridSize;

        let maxWidthWithComments = maxWidths[block.id] || 0;
        maxWidth = Math.max(maxWidth, Math.max(heightWidth.width, maxWidthWithComments));
      }

      cursorX += maxWidth + gridSize;
      cursorX += gridSize - (cursorX + gridSize / 2) % gridSize;
    }

    // TODO: New Blockly
    let topComments = workspace.getTopComments();
    for (const comment of topComments) {
      if (comment.setVisible) {
        comment.setVisible(false);
        comment.needsAutoPositioning_ = true;
        comment.setVisible(true);
        const vmComment = vm.editingTarget.comments[comment.id];
        vmComment.x = comment.x_;
        vmComment.y = comment.y_;
      }
    }

    setTimeout(() => {
      // Locate unused local variables...
      let workspace = getWorkspace();
      let map = workspace.getVariableMap();
      let vars = map.getVariablesOfType("");
      let unusedLocals = [];

      for (const row of vars) {
        if (row.isLocal) {
          let usages = getVariableUsesById(row.getId(), workspace);
          if (!usages || usages.length === 0) {
            unusedLocals.push(row);
          }
        }
      }

      if (unusedLocals.length > 0) {
        const unusedCount = unusedLocals.length;
        let message = msg("unused-var", {
          count: unusedCount,
        });
        for (let i = 0; i < unusedLocals.length; i++) {
          let orphan = unusedLocals[i];
          if (i > 0) {
            message += ", ";
          }
          message += orphan.name;
        }
        if (confirm(message)) {
          for (const orphan of unusedLocals) {
            workspace.deleteVariableById(orphan.getId());
          }
        }
      }

      // Locate unused local lists...
      let lists = map.getVariablesOfType("list");
      let unusedLists = [];

      for (const row of lists) {
        if (row.isLocal) {
          let usages = getVariableUsesById(row.getId(), workspace);
          if (!usages || usages.length === 0) {
            unusedLists.push(row);
          }
        }
      }
      if (unusedLists.length > 0) {
        const unusedCount = unusedLists.length;
        let message = msg("unused-list", {
          count: unusedCount,
        });
        for (let i = 0; i < unusedLists.length; i++) {
          let orphan = unusedLists[i];
          if (i > 0) {
            message += ", ";
          }
          message += orphan.name;
        }
        if (confirm(message)) {
          for (const orphan of unusedLists) {
            workspace.deleteVariableById(orphan.getId());
          }
        }
      }

      UndoGroup.endUndoGroup(workspace);
    }, 100);
  };
}
