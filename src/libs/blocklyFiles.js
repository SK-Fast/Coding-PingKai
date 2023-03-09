export function remove_blocks(obj) {
        var properties = Object.getOwnPropertyNames(obj)
        for (var j = 0; j < properties.length; j++) {
                if (properties[j] == 'block') {
                        // remove the block but keep the id
                        var id = obj['block'].id
                        delete obj['block']
                        obj.block = { "id": id }
                } else if (typeof (obj[properties[j]]) == 'object') {
                        remove_blocks(obj[properties[j]])
                }
        }
}

export function inject_blocks(obj, saved_blocks) {
        var properties = Object.getOwnPropertyNames(obj)
        for (var j = 0; j < properties.length; j++) {
                if (properties[j] == 'block') {
                        obj.block = saved_blocks[obj.block.id]
                } else if (typeof (obj[properties[j]]) == 'object') {
                        inject_blocks(obj[properties[j]], saved_blocks)
                }
        }
}

export function save_mergeable(workspace) {
        var blocks = workspace.getAllBlocks();
        var save_blocks = {};
        for (var i = 0; i < blocks.length; i++) {
                var json_obj = Blockly.serialization.blocks.save(blocks[i], {
                        addCoordinates: true,
                        addInputBlocks: true,
                        addNextBlocks: true,
                        doFullSerialization: true
                })

                remove_blocks(json_obj)
                save_blocks[blocks[i].id] = json_obj

        }
        save_blocks['top_blocks'] = workspace.getTopBlocks().map(block => block.id);


        return save_blocks
}

export function load_mergeable(saved_blocks, workspace) {
        var keys = Object.keys(saved_blocks)
        for (var i = 0; i < keys.length; i++) {
                inject_blocks(saved_blocks[keys[i]], saved_blocks)
        }
        workspace.clear()
        for (var i = 0; i < saved_blocks['top_blocks'].length; i++) {
                var id = saved_blocks['top_blocks'][i]
                Blockly.serialization.blocks.append(saved_blocks[id], workspace)

        }
}
