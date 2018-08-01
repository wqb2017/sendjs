import transformResponse from './../core/transform/response';
/**
 * request
 * 1. create http
 * 2. open http
 * 3. set header
 * 4. send http data
 * 5. watch http
 */
export default function createHttpRequest(args) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      args.type,
      (args.baseUrl = args.type === 'GET' ? `${args.baseUrl}${args.data}` : args.baseUrl),
      args.async
    );
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(transformResponse(xhr.responseText));
      }
    };
    xhr.onerror = function() {
      reject(xhr);
    };
    xhr.setRequestHeader(Object.keys(args.header).join(''), Object.values(args.header).join(''));
    if (args.type === 'GET') {
      xhr.send(null);
    } else {
      xhr.send(args.data);
    }
  });
}
