"use client"

import * as z from 'zod'
import {Hotel, Room} from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form'
import { Input } from '../ui/input';
import {Textarea} from '../ui/textarea';
import {Checkbox} from '../ui/checkbox';
import { useState } from 'react'
import { UploadButton } from '../uploadthing'
import { useToast } from '../ui/use-toast'
import { Image, Loader2, XCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { axios } from 'axios'

interface AddHotelFormProps{
    hotel: HotelWithRooms | null
}

export type HotelWithRooms = Hotel &{
    rooms: Room[]
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be atleast 3 characters long'
  }),
  description: z.string().min(10, {
    message: 'Description must be atleast 10 characters long'
  }), 
  image: z.string().min(1, {
    message: 'Image is required'
  }), 
  country: z.string().min(1, {
    message: 'Country is required'
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: 'Description must be atleast 10 characters long'
  }),  
  gym: z.boolean().optional(), 
  spa: z.boolean().optional(),
  bar: z.boolean().optional(), 
  laundry: z.boolean().optional(), 
  restaurant: z.boolean().optional(), 
  shopping: z.boolean().optional(), 
  freeParking: z.boolean().optional(), 
  bikeRental: z.boolean().optional(),  
  freeWifi: z.boolean().optional(),  
  movieNights: z.boolean().optional(),  
  swimmingPool: z.boolean().optional(),  
  coffeeShop: z.boolean().optional(), 
})

const AddHotelForm = ({hotel}: AddHotelFormProps) => {

  const [image, setImage] = useState<string | undefined>(hotel?.image)
  const [imageIsDeleting, setImageIsDeleting] = useState(false)

  const {toast} = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     title: '',
     description: '',
     image: '',
     country: '',
     state: '',
     city: '',
     locationDescription: '',
     gym: false,
     spa: false,
     bar: false,
     laundry: false,
     restaurant: false,
     shopping: false,
     freeParking: false,
     bikeRental: false,
     freeWifi: false,
     movieNights: false,
     swimmingPool: false,
     coffeeShop: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values)
  }

  const handleImageDelete = (image: string)=>{
    setImageIsDeleting(true)
    const imageKey = image.substring(image.lastIndexOf('/') * 1)

    axios.post('/api/uploadthing/delete', {imageKey}).then((res) => {
      if(res.data.success){
        setImage('');
        toast({
          variant: 'success',
          description: 'image removed'
        })
      }
    }).catch(() => {
      toast({
        variant: 'destructive',
        description: 'Something went wrong'
      })
    }).finally(()=> {
      setImageIsDeleting(false)
    })

  }

  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h3 className='text-lg font-semibold'>{hotel ? 'Atualize seu Hotel' : 'Descreva sobre o seu hotel' }</h3>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1 flex flex-col gap-6'>
            <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo do Hotel *</FormLabel>
              <FormDescription>
                Providencie o nome do hotel
              </FormDescription>
              <FormControl>
                <Input placeholder="Hotel na Praia..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do Hotel *</FormLabel>
              <FormDescription>
                Providencie detalhes do seu hotel
              </FormDescription>
              <FormControl>
                <Textarea placeholder="Hotel na Praia é maravilhoso, temos acesso facil a praia..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Escolha suas Cortesias</FormLabel>
          <FormDescription>Escolha as cortesias mais populares do seu hotel</FormDescription>
          <div className='grid grid-cols-2 gap-4 mt-2'>
            <FormField 
            control={form.control}
            name="gym"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Academia</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="spa"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Spar</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="bar"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Bar</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="laundry"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Lavanderia</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="restaurant"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Restaurante</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="shopping"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Compras</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="freeParking"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Estacionamento</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
          </div>
          <FormField 
            control={form.control}
            name="bikeRental"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Bicicleta</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="freeWifi"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Wiki</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="movieNights"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Noites de Cinema</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="swimmingPool"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Piscina</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="coffeeShop"
            render={({ field }) => (
              <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                <FormControl>
                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Cafeteira</FormLabel>
                <FormMessage />
              </FormItem>
            )}
            />
        </div>
        <FormField 
        control={form.control}
        name='image'
        render={({field}) => (
          <FormItem className='flex flex-col space-y-3'>
            <FormLabel>Carregar Imagem *</FormLabel>
            <FormDescription>Escolha a imagem que monstre os melhores lugares do seu Hotel</FormDescription>
            <FormControl>
              {image ? <>
              <div className='relative max-w-[400px] min-w-[200px] max-h-[200px] mt-4 '>
                <Image fill src={image} alt='hotel image' className='object-contain' />
                <Button onClick={()=> handleImageDelete(image)} type='button' size='icon' variant='ghost' className='absolute right-[-12px] top-0'>
                  {imageIsDeleting ? <Loader2 /> : <XCircle />}
                </Button>
              </div>
              </> : <>
              <div className='flex flex-col items-center max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4'>
                <UploadButton 
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  console.log("Files:", res);
                  setImage(res[0].url)
                  toast({
                    variant: 'success',
                    description: 'Upload Completed'
                  })
                }}
                onUploadError={(error: Error) => {
                  toast({
                    variant: 'destructive',
                    description: `ERROR! ${error.message}`
                  })
                }}
                />
              </div>
              </>}
            </FormControl>
          </FormItem>
        )}
        />
          </div>
          <div className='flex-1 flex flex-col gap-6'>part 2</div>
        </div>
      
      </form>
    </Form>
  )
}

export default AddHotelForm