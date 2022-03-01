# coding=UTF-8
"""Extract vizualization table into a CSV.

This script reads `index.html` and for each block in the grid records the link
URL, title, description and authors, writing these out to `summary.csv`.

This script was written in response to a Stanford Hub Leadership Team call that
took place on 2022-02-28 where we were discussing the need to have some select
subset of the content of this site available through the main NatCap site such
as through the publications database.

To recreate a conda environment with required dependencies and re-run this
script, do the following:

    $ conda create -p ./env -y -c conda-forge python=3.9 pandas beautifulsoup4
    $ conda activate ./env
    $ python convert-to-table.py

"""
import logging

import pandas
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)


def main():
    LOGGER.info('Starting to parse index.html')
    soup = BeautifulSoup(open('index.html').read(), 'html.parser')

    records = []

    for row in soup.find_all('div', class_="w3-row-padding"):
        for gridcell in row.find_all('div', class_='w3-third'):
            try:
                authors = gridcell.span.text
                gridcell.span.decompose()  # Remove the authors span from div
            except AttributeError:
                # When gridcell.span does not exist, authors undefined.
                authors = ""

            authors = authors.strip()
            title = gridcell.p.text.strip()
            description = gridcell.find_all('p')[1].text.strip()

            record = {
                'href': gridcell.a.get('href'),
                'title': title,
                'description': description,
                'authors': authors,
            }

            records.append(record)

    LOGGER.info("Finished parsing HTML, building CSV")
    dataframe = pandas.DataFrame.from_records(records)
    dataframe.to_csv('summary.csv', index=False)


if __name__ == '__main__':
    main()
