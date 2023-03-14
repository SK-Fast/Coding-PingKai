<template>
    <div ref="editorContainer"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const editorContainer = ref(null)
const disponseProvider = ref()

onMounted(async () => {
})

const initEditor = async (snippet) => {
    console.log("Importing Monaco...")
    const monaco = await import("monaco-editor")

    const editor = monaco.editor.create(editorContainer.value, {
        value: `print("Hello World!")`,
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
    initEditor
})
</script>

<style>
@import url(@/assets/css/monaco.css);
</style>