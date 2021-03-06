/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  SettingDrawer,
  DefaultFooter,
  PageHeaderWrapper,
  MushinySelect,
  CaugePlugin,
} from '../../../src/';
import { InputNumber, Select } from 'antd';
import React, { useState } from 'react';
import { Icon } from 'antd';

import Link from 'umi/link';
import history from 'umi/router';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [collapsed, handleMenuCollapse] = useState<boolean>(false);
  const [value, setValue] = useState<number>(12);
  const [settings, setSettings] = useState<Partial<Settings>>({
    fixSiderbar: true,
    fixedHeader: true,
    navTheme: 'light',
  });
  return (
    <MushinySelect
      style={{ width: 100 }}
      optionsSources={[
        {
          label: '张三',
          value: '1',
          key: '1',
        },
      ]}
      renderOption={(record, index) => {
        return (
          <Select.Option value={record.value}>
            {record.label}
            {`(${record.value})`}
          </Select.Option>
        );
      }}
    />
  );
};

export default BasicLayout;
