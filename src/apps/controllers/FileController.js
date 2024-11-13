const fsp = require('fs/promises');
const B2 = require('backblaze-b2');;

const b2 = new B2({
	applicationKeyId: '16a6ab69f414',
	applicationKey: '005d26f16a4f6e44c6c0892f1594d2a2363527bfa4'
});

const unlinkAsync = fsp.unlink;

class FileController {
    async upload(req, res) {
        const { filename, path } = req.file;

        try {
            const file = await fsp.readFile(`uploads/${filename}`, (err, data) => {
                if (err) {
                    throw err;
                }

                return data;
            });

            await b2.authorize();

            const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
                bucketId: '91267a66aa0b26699f340114'
            })

           const { data } = await b2.uploadFile({
                uploadUrl: uploadUrl,
                uploadAuthToken: authorizationToken,
                filename: filename,
                data: file
            })

            await unlinkAsync(path);

            return res.send({ url: `https://f005.backblazeb2.com/file/cursonode/${data.fileName}` });
        } catch (error) {
            return res.status(401).json({error: 'Failed to upload file'})
        }
    }
}

module.exports = new FileController();