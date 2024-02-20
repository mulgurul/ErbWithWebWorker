// @ts- ignore
import libTs from "worker-loader?inline=no-fallback!./worker.ts";

export class WebWorkerLibTs{
    worker:Worker
    constructor(){
        this.worker = new libTs()
        this.worker.onmessage = (mess) =>{
            console.log(`[WebWorkerLibTs] ${mess.data}`)
        }
    }

    terminate = () =>{
      this.worker.terminate();
    }

    onMessage = (callback: (mess: MessageEvent) => void) => {
      this.worker.onmessage = callback;
    }

    postMessage = (message: any) =>{
      this.worker.postMessage(message);
    }
}
