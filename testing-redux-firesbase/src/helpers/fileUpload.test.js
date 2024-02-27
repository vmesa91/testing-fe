import { fileUpload } from "./fileUpload"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'cloud-journal-app', 
  api_key: '428177583627468', 
  api_secret: 'u2zxoqlxHx7OfT_vmmevcUS6t8o' 
});

describe('Tests in fileUpload', () => { 

    
    test('Should upload the file successfully in Cloudinary', async() => { 
        
        // Create image to testing purpose
        const imageUrl = 'https://media.istockphoto.com/id/1381637603/photo/mountain-landscape.webp?b=1&s=170667a&w=0&k=20&c=MBaQEp6lxIWgZV0eFqQ8d2_zDbYuFk5LEFBawDinLhw='
        const resp = await fetch( imageUrl )
        const blob = await resp.blob()
        const file = new File([ blob ], 'fotoTest.jpg')

        const url = await fileUpload( file )
        expect( typeof url ).toBe('string')

        // Find ImageID
        const segments = url.split('/')
        const imgId = segments[ segments.length - 1 ].replace('.webp','')
        await cloudinary.api.delete_resources( [ 'journal-app/' + imgId ] )

     })

     test('should return error when upload fail', async() => { 
        
        const file = new File([], 'fotoTest.jpg')

        await expect( fileUpload( file ) ).rejects.toThrow('No se pudo subir imagen')

      })

     test('should return error when file doesnt exist', async() => { 
    
        await expect( fileUpload( null ) ).rejects.toThrow('No tenemos ningúna archivo a subir')

      })
 })