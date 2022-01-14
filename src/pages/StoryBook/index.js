import React, { useState } from 'react';

import {
  Card,
  H3,
  H2,
  H4,
  H1,
  Subtitle,
  MenuText,
  ButtonText,
  TableCellLinkText,
  DataTable,
  PrimaryButton,
  LightThemeIcon,
  ToolTip,
  ToolTipPlacement,
  Popover,
  PopoverPlacement,
  Alert,
  Tag,
  LocaleIcon,
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  SearchInput,
  Textarea,
  TextareaSizeEnum,
  TextareaStateEnum,
  AddIcon,
  ChiaLogo,
  ClimateWarehouseLogo,
  CloseIcon,
  DarkThemeIcon,
  ErrorIconSmall,
  ErrorIcon,
  InfoIconSmall,
  InfoIcon,
  MagnifyGlassIcon,
  MagnifyGlassIconWhite,
  SuccessIcon,
  SuccessIconSmall,
  WarningIcon,
  WarningIconSmall,
  Select,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  Body,
  Notification,
  ArrowDownIcon,
  CheckIcon,
  Pagination,
  ComponentRepeater,
  Tabs,
  Tab,
  TabPanel,
  DownloadIcon,
  EllipsisMenuIcon,
  EllipseIcon,
  BasicMenu,
} from '../../components';

const StoryBook = () => {
  const tooltipContent =
    'Distinctively monetize cost effective networks for cross-media bandwidth';

  const standardInputPlaceholder = 'Input placeholder';

  const popoverContent =
    'Conveniently initiate viral synergy without multi functional platforms. ';

  const paginationCallback = e => console.log(e);

  const addNewTagCallback = () => console.log('add tag');

  const selectOptions = [
    { label: 'Portugal', value: 'PT' },
    { label: 'Sweden', value: 'SE' },
    { label: 'Indonesia', value: 'ID' },
    { label: 'France', value: 'FR' },
    { label: 'Philippines', value: 'PH' },
    { label: 'Thailand', value: 'TH' },
    { label: 'Bosnia and Herzegovina', value: 'BA' },
    { label: 'Mexico', value: 'MX' },
    { label: 'United States', value: 'US' },
    { label: 'Finland', value: 'FI' },
    { label: 'Azerbaijan', value: 'AZ' },
    { label: 'Canada', value: 'CA' },
    { label: 'Panama', value: 'PA' },
    { label: 'Slovenia', value: 'SI' },
    { label: 'China', value: 'CN' },
    { label: 'Poland', value: 'PL' },
    { label: 'Colombia', value: 'CO' },
  ];

  const selectInitialOptions = [{ label: 'United States', value: 'US' }];

  const popoverTitle = 'Popover title';

  const [repeaterValues, updateRepeaterValues] = useState([]);
  console.log(repeaterValues);

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Card>
        <H1>This is an header H1</H1>
        <H2>This is an header H2</H2>
        <H3>This is an header H3</H3>
        <H4>This is an header H4</H4>
        <Subtitle>This is a Subtitle</Subtitle>
        <MenuText>This is Menu Text</MenuText>
        <ButtonText>This is Button Text</ButtonText>

        <ComponentRepeater
          values={repeaterValues}
          updateValues={updateRepeaterValues}
          initialValue={'initial value'}
          component={
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText="Large input"
              state={InputStateEnum.default}
            />
          }
          addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
          removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '50px',
          }}
        >
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Top}>
            <ButtonText>Tooltip Top</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Bottom}>
            <ButtonText>Bottom</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Left}>
            <ButtonText>Left</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Right}>
            <ButtonText>Right</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.TopLeft}>
            <ButtonText>Top-Left</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.TopRight}>
            <ButtonText>Top-Right</ButtonText>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.BottomLeft}
          >
            <ButtonText>Bottom-Left</ButtonText>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.BottomRight}
          >
            <ButtonText>Bottom-Right</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.LeftTop}>
            <ButtonText>Left-Top</ButtonText>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.LeftBottom}
          >
            <ButtonText>Left-Bottom</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.RightTop}>
            <ButtonText>Right-Top</ButtonText>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.RightBottom}
          >
            <ButtonText>Right-Bottom</ButtonText>
          </ToolTip>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '50px',
          }}
        >
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Top}
          >
            <ButtonText>Popover Top</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Bottom}
          >
            <ButtonText>Bottom</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Left}
          >
            <ButtonText>Left</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Right}
          >
            <ButtonText>Right</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.TopLeft}
          >
            <ButtonText>Top-Left</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.TopRight}
          >
            <ButtonText>Top-Right</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.BottomLeft}
          >
            <ButtonText>Bottom-Left</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.BottomRight}
          >
            <ButtonText>Bottom-Right</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.LeftTop}
          >
            <ButtonText>Left-Top</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.LeftBottom}
          >
            <ButtonText>Left-Bottom</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.RightTop}
          >
            <ButtonText>Right-Top</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.RightBottom}
          >
            <ButtonText>Right-Bottom</ButtonText>
          </Popover>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '120px',
            marginTop: '50px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginRight: '30px',
            }}
          >
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText="Large input"
              state={InputStateEnum.disabled}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText="Default input"
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText="Small input"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginRight: '30px',
            }}
          >
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={standardInputPlaceholder}
              state={InputStateEnum.disabled}
              variant={InputVariantEnum.error}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.error}
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.error}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginRight: '30px',
            }}
          >
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={standardInputPlaceholder}
              state={InputStateEnum.disabled}
              variant={InputVariantEnum.warning}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.warning}
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.warning}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginRight: '30px',
            }}
          >
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={standardInputPlaceholder}
              state={InputStateEnum.disabled}
              variant={InputVariantEnum.success}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.success}
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.success}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={standardInputPlaceholder}
              state={InputStateEnum.disabled}
              variant={InputVariantEnum.success}
              prefix={<LocaleIcon width={14} height={14} />}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.success}
              suffix={<LocaleIcon width={14} height={14} />}
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.success}
              prefix={<LocaleIcon width={14} height={14} />}
              suffix={<LocaleIcon width={14} height={14} />}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            paddingTop: '50px',
            height: '210px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginRight: '50px',
            }}
          >
            <Textarea
              size={TextareaSizeEnum.large}
              placeholder="Large textarea"
            />
            <Textarea
              size={TextareaSizeEnum.default}
              placeholder="Default textarea"
            />
            <Textarea
              size={TextareaSizeEnum.small}
              placeholder="Small textarea"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <Textarea
              size={TextareaSizeEnum.large}
              placeholder="disabled state"
              state={TextareaStateEnum.disabled}
            />
            <Textarea
              size={TextareaSizeEnum.default}
              placeholder="hover state"
              state={TextareaStateEnum.hover}
            />
            <Textarea
              size={TextareaSizeEnum.small}
              placeholder="typing state"
              state={TextareaStateEnum.typing}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            paddingTop: '50px',
            height: '210px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginRight: '50px',
            }}
          >
            <Select
              size={SelectSizeEnum.large}
              type={SelectTypeEnum.basic}
              options={selectOptions}
              selected={selectInitialOptions}
              placeholder="Basic select"
            />
            <Select
              size={SelectSizeEnum.default}
              type={SelectTypeEnum.basic}
              options={selectOptions}
              selected={selectInitialOptions}
              placeholder="Basic select"
            />
            <Select
              size={SelectSizeEnum.small}
              type={SelectTypeEnum.basic}
              options={selectOptions}
              placeholder="Basic select"
            />
            <Select
              size={SelectSizeEnum.small}
              type={SelectTypeEnum.basic}
              state={SelectStateEnum.disabled}
              options={selectOptions}
              selected={selectInitialOptions}
              placeholder="Basic select"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginRight: '50px',
            }}
          >
            <Select
              size={SelectSizeEnum.large}
              type={SelectTypeEnum.multiple}
              options={selectOptions}
              selected={selectInitialOptions}
              placeholder="Multiple select"
            />
            <Select
              size={SelectSizeEnum.default}
              type={SelectTypeEnum.multiple}
              options={selectOptions}
              selected={[selectOptions[0], selectOptions[1], selectOptions[2]]}
              placeholder="Multiple select"
            />
            <Select
              size={SelectSizeEnum.small}
              type={SelectTypeEnum.multiple}
              options={selectOptions}
              placeholder="Multiple select"
            />
            <Select
              size={SelectSizeEnum.small}
              type={SelectTypeEnum.multiple}
              state={SelectStateEnum.disabled}
              options={selectOptions}
              placeholder="Multiple select"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginRight: '50px',
            }}
          >
            <Select
              size={SelectSizeEnum.large}
              type={SelectTypeEnum.search}
              options={selectOptions}
              placeholder="Search select"
              selected={selectInitialOptions}
            />
            <Select
              type={SelectTypeEnum.search}
              size={SelectSizeEnum.default}
              options={selectOptions}
              state={SelectStateEnum.default}
            />
            <Select
              type={SelectTypeEnum.search}
              size={SelectSizeEnum.small}
              state={SelectStateEnum.default}
              options={selectOptions}
              placeholder="Search select"
            />
            <Select
              type={SelectTypeEnum.search}
              options={selectOptions}
              size={SelectSizeEnum.small}
              state={SelectStateEnum.disabled}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            paddingTop: '50px',
          }}
        >
          <BasicMenu
            options={[
              { label: 'item 1', action: () => console.log('click on item 1') },
              { label: 'item 1', action: () => console.log('click on item 2') },
            ]}
          />
          <BasicMenu
            options={[
              { label: 'item 1', action: () => console.log('click on item 1') },
              { label: 'item 1', action: () => console.log('click on item 2') },
            ]}
          >
            Menu
          </BasicMenu>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            paddingTop: '50px',
          }}
        >
          <ChiaLogo />
          <div style={{ width: '50px' }}></div>
          <ClimateWarehouseLogo />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '50px',
            paddingBottom: '50px',
          }}
        >
          <AddIcon width="20" height="20" fill="#262626" />
          <CloseIcon width="20" height="20" />
          <DarkThemeIcon width="20" height="20" />
          <ErrorIcon width="20" height="20" />
          <ErrorIconSmall width="20" height="20" />
          <InfoIcon width="20" height="20" />
          <InfoIconSmall width="20" height="20" />
          <LightThemeIcon width="20" height="20" />
          <LocaleIcon width="20" height="20" />
          <MagnifyGlassIcon width="20" height="20" />
          <MagnifyGlassIconWhite width="20" height="20" />
          <SuccessIcon width="20" height="20" />
          <SuccessIconSmall width="20" height="20" />
          <WarningIcon width="20" height="20" />
          <WarningIconSmall width="20" height="20" />
          <ArrowDownIcon width="20" height="20" />
          <CheckIcon width="20" height="20" />
          <DownloadIcon width="20" height="20" />
          <EllipsisMenuIcon />
          <EllipseIcon height="6" width="6" fill="#1890FF" />
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            margin: '50px 0px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Pagination
              pages={24}
              current={19}
              callback={paginationCallback}
              showLast
            />
            <Pagination pages={24} current={0} callback={paginationCallback} />
            <Pagination pages={24} current={21} callback={paginationCallback} />
            <Pagination pages={24} current={22} callback={paginationCallback} />
            <Pagination pages={24} current={23} callback={paginationCallback} />
          </div>
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Pagination pages={6} current={6} callback={paginationCallback} />
            <Pagination pages={6} current={5} callback={paginationCallback} />
            <Pagination pages={6} current={4} callback={paginationCallback} />
            <Pagination pages={6} current={3} callback={paginationCallback} />
            <Pagination pages={6} current={2} callback={paginationCallback} />
          </div>
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Pagination pages={1} current={1} callback={paginationCallback} />
            <Pagination pages={2} current={2} callback={paginationCallback} />
            <Pagination pages={3} current={3} callback={paginationCallback} />
            <Pagination pages={4} current={4} callback={paginationCallback} />
            <Pagination pages={5} current={5} callback={paginationCallback} />
          </div>
        </div>

        <DataTable
          headings={['Column 1', 'Column 2', 'Column 3']}
          data={[
            {
              column1: 'TEST_VALUE 1',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 2',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 3',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 4',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 5',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 6',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 7',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 8',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 9',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 10',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 11',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 12',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 13',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 14',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 15',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 16',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 17',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 18',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 19',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 20',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 21',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 22',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 23',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 24',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 25',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 26',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 27',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 28',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 29',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE 30',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
          ]}
          actions={
            <>
              <TableCellLinkText href="#">Example Action</TableCellLinkText>
              {'  '}
              <TableCellLinkText href="#">Example Action 2</TableCellLinkText>
            </>
          }
        />
        <div
          style={{
            display: 'flex',
            gap: '20px',
            height: '100px',
            justifyContent: 'flex-start',
            width: '80%',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: '100px',
          }}
        >
          <PrimaryButton label="Button" size="large" />
          <PrimaryButton label="Button" size="default" />
          <PrimaryButton label="Button" size="small" />
          <PrimaryButton label="Button" size="large" danger={true} />
          <PrimaryButton label="Button" size="default" danger={true} />
          <PrimaryButton label="Button" size="small" danger={true} />
          <PrimaryButton
            label="Button"
            size="large"
            icon={<LightThemeIcon color="white" />}
          />
          <PrimaryButton
            label="Button"
            size="default"
            icon={<LightThemeIcon color="white" />}
          />
          <PrimaryButton
            label="Button"
            size="small"
            icon={<LightThemeIcon color="white" height={15} />}
          />
          <PrimaryButton
            label="Button"
            size="large"
            danger={true}
            loading={true}
          />
          <PrimaryButton
            label="Button"
            size="default"
            danger={true}
            loading={true}
          />
          <PrimaryButton
            label="Button"
            size="small"
            danger={true}
            loading={true}
          />

          <PrimaryButton
            label="Button"
            size="large"
            danger={true}
            disabled={true}
          />
          <PrimaryButton
            label="Button"
            size="default"
            danger={true}
            disabled={true}
          />
          <PrimaryButton
            label="Button"
            size="small"
            danger={true}
            disabled={true}
          />
        </div>
        <div style={{ marginTop: '100px' }}>
          <Alert
            type="info"
            banner={false}
            alertTitle="Alert Title"
            showIcon
            closeable
          />
          <Alert
            type="info"
            banner={true}
            alertTitle="Alert Title"
            closeText="Close now"
          />
          <Alert
            type="info"
            banner={false}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            showIcon
            closeable
          />
          <Alert
            type="info"
            banner={true}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            closeText="Close Now"
          />
          <Alert
            type="warning"
            banner={false}
            alertTitle="Alert Title"
            showIcon
            closeable
          />
          <Alert
            type="warning"
            banner={true}
            alertTitle="Alert Title"
            closeText="Close now"
          />
          <Alert
            type="warning"
            banner={false}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            showIcon
            closeable
          />
          <Alert
            type="warning"
            banner={true}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            closeText="Close Now"
          />
          <Alert
            type="error"
            banner={false}
            alertTitle="Alert Title"
            showIcon
            closeable
          />
          <Alert
            type="error"
            banner={true}
            alertTitle="Alert Title"
            closeText="Close now"
          />
          <Alert
            type="error"
            banner={false}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            showIcon
            closeable
          />
          <Alert
            type="error"
            banner={true}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            closeText="Close Now"
          />
          <Alert
            type="success"
            banner={false}
            alertTitle="Alert Title"
            showIcon
            closeable
          />
          <Alert
            type="success"
            banner={true}
            alertTitle="Alert Title"
            closeText="Close now"
          />
          <Alert
            type="success"
            banner={false}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            showIcon
            closeable
          />
          <Alert
            type="success"
            banner={true}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            closeText="Close Now"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SearchInput size="small" />
          <SearchInput size="small" outline />
          <SearchInput size="small" usePrimaryButton />
          <SearchInput size="small" usePrimaryButton buttonText="Search" />
          <SearchInput size="small" buttonText="Search" outline />
          <SearchInput size="default" />
          <SearchInput size="default" outline />
          <SearchInput size="default" usePrimaryButton />
          <SearchInput size="default" usePrimaryButton buttonText="Search" />
          <SearchInput size="default" buttonText="Search" outline />
          <SearchInput size="large" />
          <SearchInput size="large" outline />
          <SearchInput size="large" usePrimaryButton />
          <SearchInput
            size="large"
            buttonText="Search"
            usePrimaryButton
            outline
          />
        </div>

        <div>
          <Tag addNew={addNewTagCallback} />
          <Tag closeable body="Tag" onClose={addNewTagCallback} />
          <Tag addNew={addNewTagCallback} body="Tag" />
          <Tag body="Tag" />
          <Tag />
        </div>

        <div>
          <Body size="Big">This is Big Body Text</Body>
          <Body>This is Regular Body Text</Body>
          <Body size="Bold">This is Bold Body Text</Body>
          <Body size="Small">This is Small Body Text</Body>
          <Body size="Small Bold">This is Small Bold Body Text</Body>
          <Body size="X-Small">This is X-Small Body text</Body>
          <Body size="X-Small Bold">This is X-Small Bold Body Text</Body>
        </div>
        <div>
          <Notification />
          <Notification buttonText="Button" />
          <Notification showIcon="info" />
          <Notification showIcon="info" buttonText="Button" />
          <Notification showIcon="error" />
          <Notification showIcon="error" buttonText="Button" />
          <Notification showIcon="warning" />
          <Notification showIcon="warning" buttonText="Button" />
          <Notification showIcon="success" />
          <Notification showIcon="success" buttonText="Button" />
        </div>

        <div>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Tab One" />
            <Tab label="Tab Two" />
            <Tab label="Tab Three" />
          </Tabs>
          <div>
            <TabPanel value={tabValue} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              Item Three
            </TabPanel>
          </div>
        </div>
      </Card>
    </>
  );
};

export { StoryBook };
