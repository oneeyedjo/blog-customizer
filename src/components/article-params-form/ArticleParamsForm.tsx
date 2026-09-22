import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onChange,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setForm] = useState(defaultArticleState);
  const closeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent): void => {
      if (closeRef.current && !closeRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return (): void => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  return (
    <div ref={closeRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form
          className={styles.form}
          onSubmit={(e): void => {
            e.preventDefault();
            onChange(formState);
          }}
          onReset={(): void => {
            onChange(defaultArticleState);
            setForm(defaultArticleState);
          }}
        >
          <Text as={'h2'} weight={800} size={31} uppercase={true}>
            Задайте параметры
          </Text>

          <Select
            title="шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) => setForm({ ...formState, fontFamilyOption: option })}
          />

          <RadioGroup
            title="размер шрифта"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            name="fontSize"
            onChange={(option) => setForm({ ...formState, fontSizeOption: option })}
          />

          <Select
            title="цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => setForm({ ...formState, fontColor: option })}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) => setForm({ ...formState, backgroundColor: option })}
          />

          <Select
            title="ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => setForm({ ...formState, contentWidth: option })}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
