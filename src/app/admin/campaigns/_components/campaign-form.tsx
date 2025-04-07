"use client";
import React from 'react'
import '@ant-design/v5-patch-for-react-19';
import  {Form , Input, Select,Switch ,Button, Upload, message } from "antd"
import  {useRouter} from "next/navigation" ;
import { uploadImagetoCloudinaryandreturnUrls } from "@/helper/upload"
import { addNewCampaign } from '@/actions/Campaign';
import { editCampaign } from '@/actions/Campaign';

interface Props{
  initialData ?: any ;
  isEditForm ?: boolean ;
} 

function CampaignForm({initialData,isEditForm=false}:Props) {
  const [loading=false,setloading]=React.useState<boolean>(false);
  const [isactive,setisactive]=React.useState(initialData?.isactive || false)
  const[showdonorsinCampaign,setshowdonorsinCampaign]=React.useState(initialData?.showdonorsinCampaign || false)
  const [newlySelectedImage, setnewlySelectedImage] = React.useState<any[]>([]);
  const [existingImages, setexistingImages] = React.useState<any[]>(initialData?.images || []);
 

  const router=useRouter();

  // const onFinish = async (values: any) => {
  //   try{
  //     setloading(true)
  //     values.isactive=isactive;
  //     values.showdonorsinCampaign=showdonorsinCampaign;
  //     values.images=await uploadImagetoCloudinaryandreturnUrls(newlySelectedImage)
      
  //     let response:any = null ;
  //     response= await addNewCampaign(values);
  //     if (response.error) {
  //       throw new Error(response.error);
  //     }
  //     message.success(response.message);
  //   }
  //   catch(error:any){
  //     message.error(error.message)
  //   } 
  //   finally{
  //     setloading(false)
  //   }
  // };
  const onFinish = async (values: any) => {
    try {
      setloading(true);
      values.isactive = isactive;
      values.showdonorsinCampaign = showdonorsinCampaign;
      const newlyuploadedimages = await uploadImagetoCloudinaryandreturnUrls(newlySelectedImage);
      values.images = [...existingImages, ...newlyuploadedimages];
  
      let response: any = null;
      if(isEditForm){
        // Call the editCampaign API
        values._id = initialData._id;
        response = await editCampaign(values);
      }
      else{
      response = await addNewCampaign(values);
    }
      // Check if response contains an error
      if (response.error) {
        throw new Error(response.error);
      }
  
      // Display success message
      message.success(response.message);
      router.refresh();
      router.push('/admin/campaigns');
    } catch (error: any) {
      // Log the error to the console and show the error message
      console.error('Error in submitting campaign:', error);
      message.error(error?.message || "An unexpected error occurred");
    } finally {
      setloading(false);
    }
    
  };
  
  const { TextArea } = Input;
  const categories=[
    {value: 'Technology', label: 'Technology' },
    { value: 'Art', label: 'Art' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Health', label: 'Health' },
    { value: 'Food', label: 'Food' },
    { value: 'Environment', label: 'Environment' },
    { value: 'Education', label: 'Education' },
    { value: 'Other', label: 'Other' },
  ]
  return (
   
   <Form layout="vertical"
   onFinish={(values:any)=>{
    //  values.isactive=isactive;
    //  values.showdonorsinCampaign=showdonorsinCampaign;
       console.log(values);
       onFinish(values);
    // onFinish(values);
   }}
   initialValues={initialData}
   >
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-3 pt-2 ">
          <Form.Item label="Name" name="name"
          rules={[{required:true,message:"Please enter your name"}]}>
           <Input/>
          </Form.Item>
        </div>
        <div className="lg:col-span-3  ">
          <Form.Item label="Description" name="description"
          rules={[{required:true,message:"Please enter your Description"}]}>
           <Input.TextArea rows={3}/>
          </Form.Item>
        </div>
        <Form.Item name="organizer" label="Organizer"
          rules={[{required:true,message:"Please enter your Organizer"}]}>
            <Input/>
          </Form.Item>
          <Form.Item name="TargetAmount" label="Target Amount"
          rules={[{required:true,message:"Please enter your Target Amount"}]}>
            <Input
            type="number"
            min={100}
            />
          </Form.Item>
          <Form.Item name="Category" label="Category"
          rules={[{required:true,message:"Please enter your Category"}]}>
            <Select options={categories}/>
          </Form.Item>
          <Form.Item name="StartDate" label="Start Date"
          rules={[{required:true,message:"Please enter your Start Date"}]}>
            <Input
            type="date"
            />
          </Form.Item>
          <Form.Item name="EndDate" label="End Date"
          rules={[{required:true,message:"Please enter your End Date"}]}>
            <Input
            type="date"
            />
          </Form.Item>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className='flex gap-5 '>
          <span>
            is Active ?
          </span>
      <Switch checked={isactive} onChange={(checked)=>setisactive(checked)}  />
      </div>
      

      
       
       <div className='flex gap-5'>
     <span>Show Donors in Campaign ?</span>
      <Switch checked={showdonorsinCampaign} onChange={(checked)=>setshowdonorsinCampaign(checked)}  />
       </div>
       </div> 

  <div className="mt-5">
  <Upload
    listType="picture-card"
    beforeUpload={(file) => {
      setnewlySelectedImage((prev) => [...prev, file]); // Ensure correct state updates
      return false; // Prevent automatic upload
    }}
    multiple
  >
    Upload Image
  </Upload>

  <div className="flex flex-wrap gap-5 mt-5">
    {existingImages.map((img, index) => (
     <div className='p-3 border-rounded flex flex-col gap-3  border-3 border-[#164863]' key={index}>
      <img src={img} alt="" className="h-24 w-24 object-cover"/>
      <span className='text-red-500 cursor-pointer '
      onClick={() => {
        setexistingImages((prev) => prev.filter((_, i) => i !== index));
      }}
      > Delete </span>
      </div>
    ))}
</div>
</div>


       <div className="flex justify-end gap-5 mt-5 pt-14">
        <Button onClick={() => router.push('/admin/campaigns')} > Cancel</Button>
        <Button type='primary' htmlType='submit'
         loading={loading}
        > Submit</Button>
       </div> 
   </Form>
  )
}
 
export default CampaignForm
