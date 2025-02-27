import { type FC } from 'react'

import { Container } from 'src/UI/Container/Container'

import { AppRoute } from 'src/routes/main-routes/consts'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useGetHomeNewsQuery } from 'src/store/home/home.api'
import { formatDateRange, mainFormatDate } from 'src/helpers/utils'

import styles from './index.module.scss'

export const NewsSection: FC = () => {
	const { data: newsList } = useGetHomeNewsQuery(null)

	return (
		<section className={styles.newsSection}>
			<Container>
				<FlexRow $margin='0 0 10px 0' $justifyContent='space-between'>
					<h4>Новости</h4>
					<MainButton as='route' to={AppRoute.News} $variant='secondary'>
						Все новости
					</MainButton>
				</FlexRow>
				{newsList?.length && (
					<ul className={styles.newsList}>
						{newsList.map((newsEl) => (
							<li key={newsEl.id}>
								<div className={styles.newsImgWrapper}>
									<img src={newsEl.imgUrl} alt={newsEl.title} />
								</div>
								<div className={styles.newsItemContent}>
									<h6>{newsEl.title}</h6>
									<p className={styles.newsDate}>
										{newsEl.date.length > 1
											? formatDateRange(newsEl.date as [Date, Date])
											: mainFormatDate(newsEl.date[0])}
									</p>
									<p>{newsEl?.desc}</p>
								</div>
							</li>
						))}
					</ul>
				)}
			</Container>
		</section>
	)
}
