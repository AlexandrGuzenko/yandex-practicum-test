import { DropdownMenu, TOptionItem } from './shared/ui'
import editLogo from './assets/edit.svg'
import shareLogo from './assets/share-2.svg'
import trashLogo from './assets/trash-2.svg'
import './App.css';

const optionItems: TOptionItem[] = [
  {
    title: 'Поделиться в социальных сетях',
    iconSrc: shareLogo,
    callback: () => console.log('clicked first option'),
  },
  {
    title: 'Редактировать страницу',
    iconSrc: editLogo,
  },
  {
    title: 'Удалить страницу',
    iconSrc: trashLogo,
  },
];

function App() {
  return (
    <>
      <div className="root">
        <div className="row">
          <DropdownMenu
            optionItems={optionItems}
          />
          <DropdownMenu
            optionItems={optionItems}
          />
        </div>
        <div className="row">
          <DropdownMenu
            optionItems={optionItems}
          />
          <DropdownMenu
            optionItems={optionItems}
          >
            <button>
              test children
            </button>
          </DropdownMenu>
          <DropdownMenu
            optionItems={optionItems}
          />
        </div>
        <div className="row">
          <DropdownMenu
            optionItems={optionItems}
          />
          <DropdownMenu
            optionItems={optionItems}
          />
        </div>
      </div>
      <div className="root" style={{width: '200vw'}} />
    </>
  )
}

export default App
