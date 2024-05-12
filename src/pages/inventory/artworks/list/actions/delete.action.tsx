import { Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast';
import { API } from '@/lib/API';

export const DeleteAction = ({ id }: {id: number  }) => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      await API.delete(`/inventory/artworks/${Number(id)}`);
      await toast({
        title: `Success!`,
        description: "Deleted the data",
      })
      window.location.reload(false);
    } catch (error) {
      console.log('Error updating artist:', error.message);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.response.data.message
      })
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash size={20} className='cursor-pointer hover:opacity-90 transition-opacity' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete the item and remove the data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
