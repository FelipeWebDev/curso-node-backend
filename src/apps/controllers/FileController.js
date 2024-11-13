require('dotenv').config();

const fsp = require('fs/promises');
const B2 = require('backblaze-b2');

const {
    APP_KEY_ID,
    APP_KEY,
    BUCKET_ID,
    BACKBLAZE_BASE_URL
} = process.env;

const b2 = new B2({
	applicationKeyId: APP_KEY_ID,
	applicationKey: APP_KEY
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
                bucketId: BUCKET_ID
            })

           const { data } = await b2.uploadFile({
                uploadUrl: uploadUrl,
                uploadAuthToken: authorizationToken,
                filename: filename,
                data: file
            })

            await unlinkAsync(path);

            return res.send({ url: BACKBLAZE_BASE_URL + data.fileName });
        } catch (error) {
            return res.status(401).json({error: 'Failed to upload file'})
        }
    }
}

module.exports = new FileController();