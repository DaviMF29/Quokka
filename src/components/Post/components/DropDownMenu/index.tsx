import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { DotsThree, PencilSimple, Trash } from 'phosphor-react';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { api } from '../../../../services/api';
import { useAuth } from '../../../../hooks/useAuth';
import { 
  DropdownItem, 
  DropdownMenu, 
  HamburguerButton, 
  OffCanvas, 
  OffCanvasHeader, 
  PreviousPost, 
  EditChoice, 
  EditButton, 
  OffCanvasBody, 
  PreviousPostContent 
} from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DeleteButton } from '../../styles';
import htmlReactParser from 'html-react-parser';

interface DropDownPostProps {
  _id: string;
  currentUserId: string;
  text: string;
  deleteFunction: (postId: string, userId: string) => void;
  setPostState: React.Dispatch<React.SetStateAction<boolean>>;
}

const editPostFormSchema = z.object({
  text: z.string(),
});

type EditPostFormData = z.infer<typeof editPostFormSchema>;

export function DropDownPost({ setPostState, deleteFunction, _id, currentUserId, text }: DropDownPostProps) {
  const [show, setShow] = useState(false);
  const user = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm<EditPostFormData>({
    resolver: zodResolver(editPostFormSchema),
  });

  function deletePost() {
    deleteFunction(_id, currentUserId);
  }

  async function editPost(data: EditPostFormData) {
    const url = `/api/posts/${_id}`;

    if (data.text !== text) {
      const formattedText = data.text.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/@(\w+)/g, '<a href="/$1">@$1</a>');
      await api.put(url, {
        text: formattedText,
      }, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      setPostState(false);
      setShow(false);
    } else {
      alert('Texto não modificado!');
    }
  }

  function convertHTMLToPlainText(html: string) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.replace(/<br\s*\/?>/gi, '\n').replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)">([^<]*)<\/a>/gi, '@$2');
  }

  const plainText = convertHTMLToPlainText(text);

  return (
    <>
      <Dropdown>
        <HamburguerButton className='dropdown-toggle'>
          <DotsThree size={28} />
        </HamburguerButton>

        <DropdownMenu>
          <DropdownItem>
            <EditChoice onClick={handleShow} title='Deletar post'>
              <PencilSimple size={20} />
              <span>Editar</span>
            </EditChoice>
          </DropdownItem>
          <DropdownItem>
            <DeleteButton onClick={deletePost} title='Deletar post'>
              <Trash size={20} />
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
              <h2>Post Anterior</h2>
              <textarea 
                defaultValue={plainText}
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


