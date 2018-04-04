self.requestFileSystemSync = self.webkitRequestFileSystemSync || self.requestFileSystemSync;

var filesystem = requestFileSystemSync(PERSISTENT, 10*1024*1024);

function readTextFile (name) {
    console.info(name)
    var file = filesystem.root.getFile(name, {create: false}).file();
    return new FileReaderSync().readAsText(file);
}

function appendToFile(name, contents) {
    var writer = filesystem.root.getFile(name, {create: true}).createWriter();
    writer.seek(writer.length);
    var blob = new Blob([contents], {type: 'text/plain'});
    writer.write(blob);
}

function deleteFile(name) {
    filesystem.root.getFile(name, {create: true}).remove();
}

function makeDirectory(name) {
    filesystem.root.getDirectory(name, {create: true, exclusive:false});
}

function listFiles(path) {
    var dir = filesystem.root;
    if (path) dir = dir.getDirectory(path, {create: true});

    var lister = dir.createReader();
    var list = [];
    do {
        var entries = lister.readEntries();
        for (var i = 0 ; i < entries.length ; i++) {
            var name = entries[i].name;
            if (entries[i].isDirectory) name += "/";
            list.push(name);
        }
    } while(entries.length > 0);

    return list;
}

onmessage = function (e) {
    /*
    * 메세지 형태
    * {function : "appendToFile", args: ["test", "testing, testing"]}
    * */
    var f = self[e.data.function];
    var result = f.apply(null, e.data.args);
    postMessage(result);
};