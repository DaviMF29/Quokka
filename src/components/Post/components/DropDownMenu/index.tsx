import { DotsThree,  PencilSimple, Trash} from 'phosphor-react';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownItem, DropdownMenu, HamburguerButton, OffCanvas, OffCanvasHeader, PreviousPost, EditChoice, EditButton, OffCanvasBody } from './styles';
import 'bootstrap/dist/css/bootstrap.min.css'
import { DeleteButton } from '../../styles';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';



interface DropDownPostProps {
    _id: string
    currentUserId: string
    text: string
    deleteFunction: (postId:string, userId:string) => void
    editFunction: (postId:string, userId:string, text:string) => void
}
export function DropDownPost({deleteFunction, editFunction, _id, currentUserId, text}:DropDownPostProps) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deletePost(){
        deleteFunction(_id, currentUserId)
    }

    function editPost(){
        editFunction(_id,currentUserId, text)
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

          <PreviousPost>
            <h3>Post Anterior</h3>
            <textarea defaultValue={text}></textarea>
            
          </PreviousPost>
          <EditButton onClick={editPost}>Editar</EditButton>


          
        </OffCanvasBody>
      </OffCanvas>
    
    </>
    

    


  );
}


