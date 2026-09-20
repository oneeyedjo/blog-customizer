import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [changeStyles, setStyles] = useState(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': changeStyles.fontFamilyOption.value,
          '--font-size': changeStyles.fontSizeOption.value,
          '--font-color': changeStyles.fontColor.value,
          '--container-width': changeStyles.contentWidth.value,
          '--bg-color': changeStyles.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onChange={setStyles} />
      <Article />
    </main>
  );
};
