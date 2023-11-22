// allow importing css from ts/tsx
declare module '*.css' {
    const value: any;
    export default value;
  }
  declare module '*.scss' {
    const value: any;
    export default value;
  }
  
  declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;
  
  const src: string;
  export default src;
  }