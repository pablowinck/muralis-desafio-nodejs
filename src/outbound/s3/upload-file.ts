import { ResponseDto } from "@dto/response-dto";
import { S3 } from "aws-sdk";
import { Readable } from "stream";

export class UploadFile {
  constructor(readonly s3: S3, readonly bucket: string) {}

  async execute(
    file: Buffer,
    filename: string,
    type: string
  ): Promise<ResponseDto> {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 5);
    const params = {
      Bucket: this.bucket,
      Key: filename,
      Body: Readable.from(file),
      ContentType: type,
      ContentLength: file.length,
      Expires: expirationDate,
    };

    await this.s3.upload(params).promise();

    const url = this.s3.getSignedUrl("getObject", {
      Bucket: this.bucket,
      Key: filename,
      Expires: 60 * 5, // 5 minutes
    });

    return new ResponseDto(url, true);
  }
}
