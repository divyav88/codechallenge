<template>
    <div id="modeler">
        <h1>Diagram</h1>
        <div id="container"></div>       
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
// import Viewer from 'bpmn-js/lib/Viewer';
// import markRaw from 'vue';
const RequestModule = namespace('RequestModule');

@Component
export default class DiagramComponent extends Vue  {
//  @RequestModule.Getter('getWFXML') public getWFXML!: any;
//     private viewer: any = '';
//     private diagramXML: any = '';

//     private data() {
//         return {
//             viewer: new markRaw({} as InstanceType<typeof Viewer>)
//     }
//     }
//     private mounted() {
//         console.log('Diagram');
//         // this.viewer = new Viewer();
//         // try {
//         //       this.diagramXML = '';
//         //       console.log('XML: '+ this.diagramXML);
//         //       const { warnings } = this.viewer.importXML(this.diagramXML);
//         //       console.log('rendered');
//         //     } catch (err) {
//         //     console.log('error rendering', err);
//         // }
//         // this.viewer.attachTo('#container');
//     }
}
</script>