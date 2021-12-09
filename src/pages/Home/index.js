import React from 'react';

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
} from '../../components';

const Home = () => {
  const tooltipContent =
    'Distinctively monetize cost effective networks for cross-media bandwidth';

  const popoverContent =
    'Conveniently initiate viral synergy without multi functional platforms. ';

  const popoverTitle = 'Popover title';

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

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '30px',
          }}>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Top}>
            <span>Tooltip Top</span>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Bottom}>
            <span>Bottom</span>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Left}>
            <span>Left</span>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Right}>
            <span>Right</span>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.TopLeft}>
            <span>Top-Left</span>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.TopRight}>
            <span>Top-Right</span>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.BottomLeft}>
            <span>Bottom-Left</span>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.BottomRight}>
            <span>Bottom-Right</span>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.LeftTop}>
            <span>Left-Top</span>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.LeftBottom}>
            <span>Left-Bottom</span>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.RightTop}>
            <span>Right-Top</span>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.RightBottom}>
            <span>Right-Bottom</span>
          </ToolTip>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '30px',
          }}>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Top}>
            <span>Tooltip Top</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Bottom}>
            <span>Bottom</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Left}>
            <span>Left</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Right}>
            <span>Right</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.TopLeft}>
            <span>Top-Left</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.TopRight}>
            <span>Top-Right</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.BottomLeft}>
            <span>Bottom-Left</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.BottomRight}>
            <span>Bottom-Right</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.LeftTop}>
            <span>Left-Top</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.LeftBottom}>
            <span>Left-Bottom</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.RightTop}>
            <span>Right-Top</span>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.RightBottom}>
            <span>Right-Bottom</span>
          </Popover>
        </div>

        <DataTable
          headings={['Column 1', 'Column 2', 'Column 3']}
          data={[
            {
              column1: 'TEST_VALUE',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE',
              column2: 'TEST_VALUE',
              column3: 'TEST_VALUE',
            },
            {
              column1: 'TEST_VALUE',
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
            height: '100px',
            justifyContent: 'flex-start',
            width: '80%',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
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

        <div>
          <Tag addNew />
          <Tag closeable body="Tag" onClose />
          <Tag addNew body="Tag" />
          <Tag body="Tag" />
          <Tag />
          <Tag />
        </div>
      </Card>
    </>
  );
};

export { Home };
