<template>
    <div ref="editorContainer"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const editorContainer = ref(null)
const disponseProvider = ref()
let editor;

onMounted(async () => {
})

const saveCode = () => {
    return editor.getValue()
}

const loadCode = (code) => {
    return editor.getModel().setValue(code)
}

const initEditor = async (snippet) => {
    console.log("Importing Monaco...")
    const monaco = await import("monaco-editor")

    editor = monaco.editor.create(editorContainer.value, {
        value: ``,
        language: "python",
        automaticLayout: true,
        minimap: false
    });
    
    disponseProvider.value = monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: () => {
            return {
                suggestions: snippet
            }
        }
    });

    console.log("Created Monaco!", editor)

    return editor
}

onUnmounted(() => {
    disponseProvider.value.dispose()
})

defineExpose({
    initEditor,
    saveCode,
    loadCode
})
</script>

<style>
@import url(@/assets/css/monaco.css);
</style>