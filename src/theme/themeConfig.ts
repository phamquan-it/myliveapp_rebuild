// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
  },
  components:{
      Table:{
          cellPaddingBlock: 8,
      }
  }
  
};

export default theme;
