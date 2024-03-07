from bs4 import BeautifulSoup
from pymongo import MongoClient
import requests
import re

# Use your environment credentials to construct the connection string
db_user = 'voluntreeUser'
db_pass = '1234'  # Make sure to use your actual password in a secure way
db_host = 'cluster0.ghibpdj.mongodb.net'
db_name = 'volunteeringOpportunitiesDB'  # Replace with the name of your database
collection_name = 'opportunities'  # Replace with the name of your collection

# Construct the MongoDB Atlas connection string
conn_string = f'mongodb+srv://{db_user}:{db_pass}@{db_host}/{db_name}?retryWrites=true&w=majority'

# Establishing the connection
client = MongoClient(conn_string)
db = client[db_name]
collection = db[collection_name]

proceed = True
def extract_reviews(details_soup):
    reviews_section = details_soup.find('section', id='reviews-section')
    if not reviews_section:
        return "No reviews section found"
    
    reviews = []
    articles = reviews_section.find_all('article')
    for article in articles:
        review_item = {}

        name_span = article.find('span', class_='mr-12px')
        if name_span:
            review_item['ReviewerName'] = name_span.get_text().strip()

        rating_span = article.find('span', class_='text-orange')
        if rating_span:
            review_item['ReviewerRating'] = rating_span.get_text().strip()

        review_div = article.find('div', class_='text-3')
        if review_div:
            partial_review_text = review_div.get_text().strip()

            first_dot_index = partial_review_text.find('.')
            if first_dot_index != -1:
                # Include the dot in the extracted text
                review_item['ReviewerReview'] = partial_review_text[:first_dot_index+1]
            else:
                # If there's no dot, take the whole text
                review_item['ReviewerReview'] = partial_review_text

        reviews.append(review_item)
    
    return reviews

while(proceed):
    url = "https://www.volunteerworld.com/en/filter?CountryM49=188&Currency=USD&Subcategory=Agriculture"
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "html.parser")

    no_results_div = soup.find("div", string=lambda t: t and "No results found - please use a more global search" in t)

    if no_results_div:
        proceed = False
    else:
        all_opportunities = soup.find_all("article", class_="m-[5px] flex h-full w-full flex-col overflow-hidden rounded-[10px] bg-white shadow-[rgba(0,0,0,0.14)_0px_2px_2px_0px,rgba(0,0,0,0.12)_0px_1px_5px_0px,rgba(0,0,0,0.2)_0px_3px_1px_-2px]")
        # Process the found opportunities here

        base_url = "https://www.volunteerworld.com"

        for opportunity in all_opportunities:
            item = {}

            relative_details_url = opportunity.find("a", class_="ml-[10px] rounded-[3px] bg-[#3399CC] px-[14px] py-[10px] text-2 uppercase text-white max-ssm:hidden")['href']

            full_details_url = base_url + relative_details_url

            details_page_response = requests.get(full_details_url)
            details_soup = BeautifulSoup(details_page_response.text, "html.parser")

            location_element = details_soup.find("button", class_="inline-block text-left text-2 text-gray-5 underline sm:text-3")

            if location_element:
                item['Location'] = location_element.text.strip()
            else:
                item['Location'] = "Location not found"


            item['Title'] = opportunity.find("img").attrs["alt"]

            item['Image'] = opportunity.find("img").attrs["src"]

            item['Rating'] = opportunity.find("span",class_ = "mr-[3px] text-[#F29F05]").text

            item['Reviews'] = opportunity.find("span", class_ = "mr-[5px] text-[#727272]").text

            duration_div = opportunity.find("div", class_="mb-[16px] flex flex-row items-center whitespace-nowrap text-[0.8125rem] leading-[1.125rem] text-[#727272]")
            if duration_div:
                
                text_components = [component.strip() for component in duration_div.stripped_strings]

                numeric_components = [component for component in text_components if component.replace(' ', '').isdigit()]

                if len(numeric_components) >= 3:
                    item['MinDuration'] = numeric_components[1]  
                    item['MaxDuration'] = numeric_components[2]  
                else:
                    item['MinDuration'] = "Min duration not found"
                    item['MaxDuration'] = "Max duration not found"
            else:
                item['MinDuration'] = "Duration container not found"
                item['MaxDuration'] = "Duration container not found"


            age_pattern = re.compile(r'Age\s+(\d+)')
            age_match = age_pattern.search(duration_div.get_text())
            if age_match:
                item['Age'] = age_match.group(1)

            description_p = opportunity.find("p", class_="text-[0.8125rem] leading-[1.125rem] text-[#727272]")
            if description_p:
                full_description = description_p.text.strip()
                # Look for the "Details >" part and split the description before this part
                details_index = full_description.find("Details >")
                if details_index != -1:
                    # Exclude the "Details >" part from the description
                    full_description = full_description[:details_index].strip()

                # Now, split the description into sentences by period
                sentences = full_description.split('.')
                # Take the first two sentences if there are at least two, otherwise take what's available
                if len(sentences) > 2:
                    # Join the first two sentences and add a period at the end of the second sentence
                    item['Description'] = '.'.join(sentences[:2]) + '.'
                else:
                    # If there are not enough sentences for two periods, return the full description
                    # This also handles the case where there's only one sentence or no periods
                    item['Description'] = full_description
            else:
                item['Description'] = "Description container not found"



            time_commitment_container = details_soup.find('h4', string='Time Commitment').parent
            if time_commitment_container:
                time_commitment_text = time_commitment_container.find('span', {'class': 'w-full text-1 text-gray-4'}).get_text(strip=True)
                time_commitment_parts = time_commitment_text.split(' from ')
                if len(time_commitment_parts) == 2:
                    days, hours = time_commitment_parts
                    item['TimeCommitmentDays'] = days.strip()
                    item['TimeCommitmentHours'] = hours.strip()
                else:
                    item['TimeCommitmentDays'] = 'Error: Could not split the time commitment text'
                    item['TimeCommitmentHours'] = 'Error: Could not split the time commitment text'
            else:
                item['TimeCommitmentDays'] = 'Error: Time Commitment container not found'
                item['TimeCommitmentHours'] = 'Error: Time Commitment container not found'
            
            #THERE IS A LITTLE PROBLEM GETTING THE DAYS AND HOURS FROM VOLUNTEERING OPPORTUNITIES CARDS THAT DO NOT MENTION HOURS (AKA Only - Monday-Friday and etc...)

            included_section = details_soup.find('section', id='included-section')
            # Initialize a list to store service names
            service_names = []

            if included_section:
                service_buttons = included_section.find_all('button')

                for button in service_buttons:
                    h4_element = button.find('h4')
                    if h4_element:
                        service_name = h4_element.get_text().strip()
                        service_names.append(service_name)
                    else:
                        continue  

            else:
                service_names.append("Included services section not found")

            # Assign the list of service names to the 'Services' key in the item dictionary
            item['Services'] = service_names
            item['Reviewers'] = extract_reviews(details_soup)

            transformed_item = {
                "title": item['Title'],
                "location": item['Location'],
                "description": item['Description'],
                "header_image": item['Image'],  # Assuming 'Image' contains a URL or a relative path to an image file
                "high_demand": False,  # Set based on your criteria or leave as a default
                "verified_by_volunteer_membership": True,  # Default or criteria-based
                "response_rate": "Very High",  # Placeholder or based on available data
                "overview": {
                    "detailed_description": item['Description'],  # Reusing the description if no other detailed description is available
                    "reviews": [
                        {
                            "name": review.get('ReviewerName', 'Name not provided'),
                            # "date": {"$date": "2024-01-15T00:00:00Z"},  # Placeholder date, adjust as necessary
                            "rating": review.get('ReviewerRating', 'Rating not provided'),
                            "comment": review.get('ReviewerReview', 'Comment not provided')
                        } for review in item['Reviewers'] if review  # Make sure to skip empty dictionaries
                    ]
                },
                "information": {
                    "details": {
                        "availability": "Available until further notice",  # Placeholder, adjust as necessary
                        "working_hours": item.get('TimeCommitmentHours', 'Not specified'),
                        "volunteers_needed": 50,  # Placeholder or based on available data
                        "difficulty_level": "Medium"  # Default or criteria-based
                    },
                    "includes": {
                        "food_beverages": "Food" in item['Services'],
                        "internet_access": False,  # Assuming not available, adjust based on actual data
                        "accommodation": "Housing" in item['Services']
                    },
                    "about_farmer": "Information not available",  # Placeholder, adjust as necessary
                },
                "location_details": {
                    "coordinates": {
                        "lat": 0.0,  # Placeholder latitude, adjust as necessary
                        "lng": 0.0   # Placeholder longitude, adjust as necessary
                    },
                    "address": item['Location']
                },
                "rating": {
                    "score": item['Rating'],
                    "total_reviews": item['Reviews']  # Removing commas for conversion to int
                },
                "cost": {
                    "price_per_week": 0,  # Placeholder, adjust as necessary
                    "currency": "EUR",  # Default or based on available data
                    "duration_weeks": {
                        "min": int(item['MinDuration']),
                        "max": int(item['MaxDuration'])
                    }
                },
                "minimum_age": int(item['Age']),
                "services": [
                    {
                        "name": service,
                        "icon": "svgs/{}.svg".format(service.lower())  # Assuming a simple mapping for icon names
                    } for service in item['Services']
                ]
            }
            collection.insert_one(transformed_item)
            proceed=False

            # print(item['Title'])
            # print(item['Rating'])
            # print(item['Location'])
            # print(item['Reviews'])
            # print(item['MinDuration'])
            # print(item['MaxDuration'])
            # print(item['Age'])
            # print(item['Description'])
            # print(item['TimeCommitmentDays'])
            # print(item['TimeCommitmentHours'])
            # print(item['Services'])
            # print(item['Reviewers'])
        

            #data.append(item)

    #current_page += 1
    
