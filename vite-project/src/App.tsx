import { Children, memo, useCallback, useMemo } from 'react';
import Select, { components, OptionProps, createFilter } from 'react-select'
import VirtualList from 'react-tiny-virtual-list';

export interface CID {
  value: string;
  label: string;
}

const DEFAULT_ITEM_HEIGHT = 36;

const MAX_LENGTH_DEFAULT_HEIGHT = 36;
const SCROLL_WIDTH = 16

function calculateItemHeight(cid?: CID) {
  if (!cid || cid.label.length < MAX_LENGTH_DEFAULT_HEIGHT) {
    return DEFAULT_ITEM_HEIGHT;
  }

  const wrapper = document.querySelector('#__select-container__');

  const width = wrapper?.getBoundingClientRect()?.width ?? 310;

  const div = document.createElement('div');

  div.style.position = 'absolute';
  div.style.left = '-2000px';
  div.style.padding = '8px 12px';
  div.style.width = `${width - SCROLL_WIDTH}px`;
  div.style.boxSizing = 'border-box';
  div.textContent = cid.label;

  document.body.append(div);

  const { height } = div.getBoundingClientRect();

  div.remove();

  return Math.max(height + 8, DEFAULT_ITEM_HEIGHT);
}


function CustomMenuList({ children, ...props }) {
  const { options, maxHeight, getValue } = props;

  const renderItem = ({ index, style }) => {
    if (Array.isArray(children)) {
      return (
        <div style={style} key={index}>
          {children[index]}
        </div>
      );
    }

    return (
      <div
        key={index}
        style={style}
      >
        {children?.props?.children}
      </div>
    );
  }


  const [value] = getValue();
  const initialOffset = options.indexOf(value) * DEFAULT_ITEM_HEIGHT;
  const childrenOptions = Children.toArray(children);

  const wrapperHeight = maxHeight < childrenOptions.length * DEFAULT_ITEM_HEIGHT ?
    maxHeight : childrenOptions.length * DEFAULT_ITEM_HEIGHT;

  const calculateItemSize = useCallback((index: number) => calculateItemHeight(options[index]), [options]);

  return (
    <span id="__react-menu__">
      <VirtualList
        width="100%"
        height={wrapperHeight + 6}
        scrollOffset={initialOffset}
        itemCount={childrenOptions.length}
        itemSize={calculateItemSize}
        renderItem={renderItem as any}
        overscanCount={10}
      />
    </span>
  );
}

interface CIDSelectProps {
  cids: CID[];
  cid: string;
  setCID: (cid: string) => void;
  isLoading: boolean;
  placeholder: string;
}

const style = { menuPortal: base => ({ ...base, zIndex: 9999 }) }

const Option = ({ children, ...props }: OptionProps) => {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = Object.assign(props, { innerProps: rest });

  return (
    <components.Option
      {...newProps as OptionProps}
    >
      {children}
    </components.Option>
  );
};

function MenuListBase({
  cid,
  isLoading,
  placeholder,
  setCID,
  cids
}: CIDSelectProps): JSX.Element {

  const selectValue = useMemo(() => cids.find(CID => CID.value === cid), [cids, cid]);

  const handleChange = useCallback((selectedOption: CID | null) => {
    if (!selectedOption) { return }

    setCID(selectedOption.value)
  }, [setCID]);


  return (
    <Select
      value={selectValue}
      onChange={handleChange}
      options={cids.map((cid) => ({ value: cid.value, label: `${cid.label.slice(0, 35)}...` })) as any}
      menuPortalTarget={document.body}
      styles={style}
      isDisabled={isLoading}
      placeholder={placeholder}
      isLoading={isLoading}
      components={{ Option, MenuList: CustomMenuList } as any}
      filterOption={createFilter({ ignoreAccents: false })}
      classNames={{ container: () => '__select-container__' }}
    />
  );
}

export const MenuList = memo(MenuListBase);

function App() {

  return (
    <MenuList cids={[
      { value: '1', label: 'CID 1' },
      { value: '2', label: 'CID 2' },
      { value: '3', label: 'CID 3' },
      { value: '4', label: 'CID 4' },
      { value: '5', label: 'CID 5' },
      { value: '6', label: 'CID 6' },
      { value: '7', label: 'CID 7' },
      { value: '8', label: 'CID 8' },
      { value: '9', label: 'CID 9' },
      { value: '10', label: 'CID 10' },
      { value: '11', label: 'CID 11' },
      { value: '12', label: 'CID 12' },
      { value: '13', label: 'CID 13' },
      { value: '14', label: 'CID 14' },
      { value: '15', label: 'CID 15' },
      { value: '16', label: 'CID 16' },
      { value: '17', label: 'CID 17' },
      { value: '18', label: 'CID 18' },
      { value: '19', label: 'CID 19' },
      { value: '20', label: 'CID 20' },
      { value: '21', label: 'CID 21' },
      { value: '22', label: 'CID 22' },
      { value: '23', label: 'CID 23' },
      { value: '24', label: 'CID 24' },
      { value: '25', label: 'CID 25' },
      { value: '26', label: 'CID 26' },
      { value: '27', label: 'CID 27' },
      { value: '28', label: 'CID 28' },
      { value: '29', label: 'CID 29' },
      { value: '30', label: 'CID 30' },
      { value: '31', label: 'CID 31' },
      { value: '32', label: 'CID 32' },
      { value: '33', label: 'CID 33' },
      { value: '1', label: 'CID 1' },
      { value: '2', label: 'CID 2' },
      { value: '3', label: 'CID 3' },
      { value: '4', label: 'CID 4' },
      { value: '5', label: 'CID 5' },
      { value: '6', label: 'CID 6' },
      { value: '7', label: 'CID 7' },
      { value: '8', label: 'CID 8' },
      { value: '9', label: 'CID 9' },
      { value: '10', label: 'CID 10' },
      { value: '11', label: 'CID 11' },
      { value: '12', label: 'CID 12' },
      { value: '13', label: 'CID 13' },
      { value: '14', label: 'CID 14' },
      { value: '15', label: 'CID 15' },
      { value: '16', label: 'CID 16' },
      { value: '17', label: 'CID 17' },
      { value: '18', label: 'CID 18' },
      { value: '19', label: 'CID 19' },
      { value: '20', label: 'CID 20' },
      { value: '21', label: 'CID 21' },
      { value: '22', label: 'CID 22' },
      { value: '23', label: 'CID 23' },
      { value: '24', label: 'CID 24' },
      { value: '25', label: 'CID 25' },
      { value: '26', label: 'CID 26' },
      { value: '27', label: 'CID 27' },
      { value: '28', label: 'CID 28' },
      { value: '29', label: 'CID 29' },
      { value: '30', label: 'CID 30' },
      { value: '31', label: 'CID 31' },
      { value: '32', label: 'CID 32' },
      { value: '33', label: 'CID 33' },
      { value: '1', label: 'CID 1' },
      { value: '2', label: 'CID 2' },
      { value: '3', label: 'CID 3' },
      { value: '4', label: 'CID 4' },
      { value: '5', label: 'CID 5' },
      { value: '6', label: 'CID 6' },
      { value: '7', label: 'CID 7' },
      { value: '8', label: 'CID 8' },
      { value: '9', label: 'CID 9' },
      { value: '10', label: 'CID 10' },
      { value: '11', label: 'CID 11' },
      { value: '12', label: 'CID 12' },
      { value: '13', label: 'CID 13' },
      { value: '14', label: 'CID 14' },
      { value: '15', label: 'CID 15' },
      { value: '16', label: 'CID 16' },
      { value: '17', label: 'CID 17' },
      { value: '18', label: 'CID 18' },
      { value: '19', label: 'CID 19' },
      { value: '20', label: 'CID 20' },
      { value: '21', label: 'CID 21' },
      { value: '22', label: 'CID 22' },
      { value: '23', label: 'CID 23' },
      { value: '24', label: 'CID 24' },
      { value: '25', label: 'CID 25' },
      { value: '26', label: 'CID 26' },
      { value: '27', label: 'CID 27' },
      { value: '28', label: 'CID 28' },
      { value: '29', label: 'CID 29' },
      { value: '30', label: 'CID 30' },
      { value: '31', label: 'CID 31' },
      { value: '32', label: 'CID 32' },
      { value: '33', label: 'CID 33' },
      { value: '1', label: 'CID 1' },
      { value: '2', label: 'CID 2' },
      { value: '3', label: 'CID 3' },
      { value: '4', label: 'CID 4' },
      { value: '5', label: 'CID 5' },
      { value: '6', label: 'CID 6' },
      { value: '7', label: 'CID 7' },
      { value: '8', label: 'CID 8' },
      { value: '9', label: 'CID 9' },
      { value: '10', label: 'CID 10' },
      { value: '11', label: 'CID 11' },
      { value: '12', label: 'CID 12' },
      { value: '13', label: 'CID 13' },
      { value: '14', label: 'CID 14' },
      { value: '15', label: 'CID 15' },
      { value: '16', label: 'CID 16' },
      { value: '17', label: 'CID 17' },
      { value: '18', label: 'CID 18' },
      { value: '19', label: 'CID 19' },
      { value: '20', label: 'CID 20' },
      { value: '21', label: 'CID 21' },
      { value: '22', label: 'CID 22' },
      { value: '23', label: 'CID 23' },
      { value: '24', label: 'CID 24' },
      { value: '25', label: 'CID 25' },
      { value: '26', label: 'CID 26' },
      { value: '27', label: 'CID 27' },
      { value: '28', label: 'CID 28' },
      { value: '29', label: 'CID 29' },
      { value: '30', label: 'CID 30' },
      { value: '31', label: 'CID 31' },
      { value: '32', label: 'CID 32' },
      { value: '33', label: 'CID 33' },
      { value: '1', label: 'CID 1' },
      { value: '2', label: 'CID 2' },
      { value: '3', label: 'CID 3' },
      { value: '4', label: 'CID 4' },
      { value: '5', label: 'CID 5' },
      { value: '6', label: 'CID 6' },
      { value: '7', label: 'CID 7' },
      { value: '8', label: 'CID 8' },
      { value: '9', label: 'CID 9' },
      { value: '10', label: 'CID 10' },
      { value: '11', label: 'CID 11' },
      { value: '12', label: 'CID 12' },
      { value: '13', label: 'CID 13' },
      { value: '14', label: 'CID 14' },
      { value: '15', label: 'CID 15' },
      { value: '16', label: 'CID 16' },
      { value: '17', label: 'CID 17' },
      { value: '18', label: 'CID 18' },
      { value: '19', label: 'CID 19' },
      { value: '20', label: 'CID 20' },
      { value: '21', label: 'CID 21' },
      { value: '22', label: 'CID 22' },
      { value: '23', label: 'CID 23' },
      { value: '24', label: 'CID 24' },
      { value: '25', label: 'CID 25' },
      { value: '26', label: 'CID 26' },
      { value: '27', label: 'CID 27' },
      { value: '28', label: 'CID 28' },
      { value: '29', label: 'CID 29' },
      { value: '30', label: 'CID 30' },
      { value: '31', label: 'CID 31' },
      { value: '32', label: 'CID 32' },
      { value: '33', label: 'CID 33' },
      { value: '1', label: 'CID 1' },
      { value: '2', label: 'CID 2' },
      { value: '3', label: 'CID 3' },
      { value: '4', label: 'CID 4' },
      { value: '5', label: 'CID 5' },
      { value: '6', label: 'CID 6' },
      { value: '7', label: 'CID 7' },
      { value: '8', label: 'CID 8' },
      { value: '9', label: 'CID 9' },
      { value: '10', label: 'CID 10' },
      { value: '11', label: 'CID 11' },
      { value: '12', label: 'CID 12' },
      { value: '13', label: 'CID 13' },
      { value: '14', label: 'CID 14' },
      { value: '15', label: 'CID 15' },
      { value: '16', label: 'CID 16' },
      { value: '17', label: 'CID 17' },
      { value: '18', label: 'CID 18' },
      { value: '19', label: 'CID 19' },
      { value: '20', label: 'CID 20' },
      { value: '21', label: 'CID 21' },
      { value: '22', label: 'CID 22' },
      { value: '23', label: 'CID 23' },
      { value: '24', label: 'CID 24' },
      { value: '25', label: 'CID 25' },
      { value: '26', label: 'CID 26' },
      { value: '27', label: 'CID 27' },
      { value: '28', label: 'CID 28' },
      { value: '29', label: 'CID 29' },
      { value: '30', label: 'CID 30' },
      { value: '31', label: 'CID 31' },
      { value: '32', label: 'CID 32' },
      { value: '33', label: 'CID 33' },
    ]} cid="" setCID={
      (cid) => console.log(cid)
    } isLoading={false} placeholder="Select CID" />
  )
}

export default App
