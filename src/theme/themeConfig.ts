// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
  },
  components:{
      Table:{
          cellPaddingBlock: 8
      },
      Layout: {
          headerBg:'white'
      }
  }
  
};

export default theme;
