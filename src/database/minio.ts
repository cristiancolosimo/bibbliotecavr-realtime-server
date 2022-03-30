import Minio from 'minio'

var minioClient = new Minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
});

interface MinioConfig {
    endPoint: "string",
    port:number,
    useSSL: boolean,
    accessKey: string,
    secretKey: string
}


class MinioStorage{
    storage : Minio.Client;
    constructor(config:MinioConfig){
        this.storage = new Minio.Client(config);
    }
    
}

