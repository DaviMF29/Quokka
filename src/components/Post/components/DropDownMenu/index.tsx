import { DotsThree,  PencilSimple, Trash} from 'phosphor-react';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownItem, DropdownMenu, HamburguerButton, OffCanvas, OffCanvasHeader, PreviousPost, EditChoice, EditButton, OffCanvasBody, PreviousPostContent } from './styles';
import 'bootstrap/dist/css/bootstrap.min.css'
import { DeleteButton } from '../../styles';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from '../../../../services/api';



interface DropDownPostProps {
    _id: string
    currentUserId: string
    text: string
    deleteFunction: (postId:string, userId:string) => void
}

const editPostFormSchema = z.object({
    text: z.string(),
})

type EditPostFormData = z.infer<typeof editPostFormSchema>

export function DropDownPost({deleteFunction, _id, currentUserId, text}:DropDownPostProps) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {register, handleSubmit, reset} = useForm<EditPostFormData>({
        resolver: zodResolver(editPostFormSchema)
    })

    function deletePost(){
        deleteFunction(_id, currentUserId)
    }

    async function editPost(data:EditPostFormData){
        const url = `/api/posts/${_id}`
        
        if(data.text !== text){
            await api.put(url,{
                text: data.text
            })
            
        }
        else{
            alert('Texto não modificado!')
        }
    }
  return (
    <>
        <Dropdown>
            <HamburguerButton className='dropdown-toggle'>
                <DotsThree size={28}/>
            </HamburguerButton>

            <DropdownMenu>
            <DropdownItem href="#/action-2">
                    <EditChoice onClick={handleShow} title='Deletar post'>
                            <PencilSimple size={20}/>
                            <span>Editar</span>
                    </EditChoice>
                </DropdownItem>
                <DropdownItem href="#/action-2">
                    <DeleteButton onClick={deletePost} title='Deletar post'>
                            <Trash size={20}/>
                            <span>Excluir</span>
                    </DeleteButton>
                </DropdownItem>
            </DropdownMenu>
    </Dropdown>


    <OffCanvas show={show} onHide={handleClose}>
        <OffCanvasHeader closeButton data-bs-theme='dark'>
          <Offcanvas.Title>Editar Post</Offcanvas.Title>
        </OffCanvasHeader>
        <OffCanvasBody>

          <PreviousPost onSubmit={handleSubmit(editPost)}>

            <PreviousPostContent>
                <h3>Post Anterior</h3>
                <textarea 
                    defaultValue={text}
                    {...register('text')}
                />
            </PreviousPostContent>
            
            <EditButton type='submit'>Editar</EditButton>
          </PreviousPost>
          


          
        </OffCanvasBody>
      </OffCanvas>
    
    </>
    

    


  );
}


