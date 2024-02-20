//import dgram from 'dgram';

const ctx: Worker = self as any;

let webWorkerInitialized = false;

// Initialize command from App
ctx.onmessage = (event) => {
  const {cmd, data} = event.data;
  console.log(`WEBWORKER: Got message from App of type: ${cmd}`, event.data);
  if (cmd === 'init') {

    setInterval(() => {
      ctx.postMessage({
        type: 'time',
        data: new Date().getTime(),
      });
    }, data.intervalMs);

    // createSocket();
    webWorkerInitialized = true;
  }
}

let udpSocket: any = null;



function createSocket() {
  console.log('UDP Socket starting at port 2000');
  // udpSocket = dgram.createSocket('udp4');
//       // On socket error
//       udpSocket.on('error', (err: any) => {
//             console.log(`UDP server error:\n${err}`);
//         });

//         udpSocket.on('message', (data: any, rinfo: any) => {
//               console.log("Got UDP data", data);
//               postMessage(data)
//               //     type: 'udp',
//               //     data: data,
//               //     time: new Date().getTime(),
//               // });
//           });

//           // On start listening
//           udpSocket.on('listening', () => {
//             var address = udpSocket.address();
//             //console.log('UDP server listening ' + address.address + ':' + address.port);
//             console.log('UDP server listening ' + address.address + ':' + address.port);

//     //udpSocket.setBroadcast(true);
//     });

//     // On socket close
//     udpSocket.on('close', () => {
//         console.log('UDP Connection closed');
//     });

//     udpSocket.bind(2000);

  console.log('UDP Socket started at port 2000');
}

// createSocket();

// Export an empty object to make this file a module
export default ctx;
