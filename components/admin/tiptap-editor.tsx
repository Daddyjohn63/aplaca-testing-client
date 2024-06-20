import { type Editor, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Text, Image as ImageIcon, Link as LinkIcon, Strikethrough, Italic, Code, List, ListOrdered, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6} from 'lucide-react'
import { Toggle } from "@/components/ui/toggle"
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

const MenuBar = ({ editor }: {editor: Editor | null}) => {

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-300 mb-2 bg-transparent pb-2 flex flex-wrap gap-1">
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => 
          editor.chain().focus().toggleBold().run()
        }
        className={editor.isActive('bold') ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <Bold className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => 
          editor.chain().focus().toggleItalic().run()
        }
        className={editor.isActive('italic') ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <Italic className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("strikethrough")}
        onPressedChange={() => 
          editor.chain().focus().toggleStrike().run()
        }
        className={editor.isActive('strikethrough') ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <Strikethrough className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("heading", {level: 1})}
        onPressedChange={() => 
          editor.chain().focus().toggleHeading({level:1}).run()
        }
        className={editor.isActive('heading1', { level: 1 }) ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'} 
      >
        <Heading1 className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("heading", {level: 2})}
        onPressedChange={() => 
          editor.chain().focus().toggleHeading({level:2}).run()
        }
        className={editor.isActive('heading', { level: 2 }) ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <Heading2 className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("heading", {level: 3})}
        onPressedChange={() => 
          editor.chain().focus().toggleHeading({level:3}).run()
        }
        className={editor.isActive('heading', { level: 3 }) ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}

      >
        <Heading3 className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("heading",{level: 4})}
        onPressedChange={() => 
          editor.chain().focus().toggleHeading({level:4}).run()
        }
        className={editor.isActive('heading', { level: 4 }) ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <Heading4 className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("heading", {level: 5})}
        onPressedChange={() => 
          editor.chain().focus().toggleHeading({level:5}).run()
        }
        className={editor.isActive('heading', { level: 5 }) ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <Heading5 className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("heading", {level: 6})}
        onPressedChange={() => 
          editor.chain().focus().toggleHeading({level:6}).run()
        }
        className={editor.isActive('heading', { level: 6 }) ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <Heading6 className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => 
          editor.chain().focus().toggleBulletList().run()
        }
        className={editor.isActive('bulletList') ?  'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <List className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => 
          editor.chain().focus().toggleOrderedList().run()
        }
        className={editor.isActive('orderedList') ?  'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <ListOrdered className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("link")}
        onPressedChange={() => {
          const previousUrl = editor.getAttributes('link').href
          const url = window.prompt('URL', previousUrl)

          // cancelled
          if (url === null) {
            return
          }
          // empty
          if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
              .run()
            return
          }

          editor.chain().focus().extendMarkRange('link').toggleLink({href: url, target: 'blank'}).run()
        }
        }
        className={editor.isActive('link') ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <LinkIcon className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("image")}
        onPressedChange={() => {

          const url = window.prompt('URL')
            if(url) {
            editor.chain().focus().setImage({src: url}).run()
          }
        }}
        className={editor.isActive('image') ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <ImageIcon className="h-4 w-4"/>
      </Toggle>
      <Toggle
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => 
          editor.chain().focus().toggleCodeBlock().run()
        }
        className={editor.isActive('codeBlock') ? 'bg-muted-foreground/30 text-black hover:bg-muted-foreground/20' : 'text-muted-foreground hover:text-white hover:bg-gray-600'}
      >
        <Code className="h-4 w-4"/>
      </Toggle>

    </div>
  );
};



export const TiptapEditor = (
  {
    disabled,
    description,
    onChange,
  }: {
    disabled: boolean,
    description: string,
    onChange: (richText: string) => void
  }) => {


  const editor = useEditor({
    content: description,
    editable: !disabled,
    extensions: [
      StarterKit.configure({}),
      Link.configure({
        openOnClick: false,
        autolink: true,
        validate: href => /^https?:\/\//.test(href),
      }),
      Image.configure({
        inline: true,
      })
    ],
    editorProps: {
      attributes: {
        class: "rounded-md bg-input text-black min-h-[150px] p-2"
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  });

  return (
    <div className="bg-input relative p-3 rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};


