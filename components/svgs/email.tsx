import React  from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string;
}

function IconEnvelopeFilled({size = '20px', ...props}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={size} height={size} viewBox="0 0 20 20" {...props}><path d="m10,9.905l7.937-3.527c-.301-1.909-1.944-3.378-3.937-3.378H6c-1.993,0-3.636,1.469-3.937,3.378l7.937,3.527Z" fill="currentColor" strokeWidth="0" data-color="color-2"></path><path d="m10.812,11.733c-.258.115-.535.172-.812.172s-.555-.057-.813-.172l-7.187-3.194v4.461c0,2.206,1.794,4,4,4h8c2.206,0,4-1.794,4-4v-4.461l-7.188,3.195Z" strokeWidth="0" fill="currentColor"></path></svg>
  );
};

export default IconEnvelopeFilled;