from flask import Flask, jsonify, request, send_file

import pandas as pd
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/current-tender',methods=['GET'])
def current_tendenr():
    df = pd.read_csv('Merged_Dataset.csv')
    
    df['TARIKH_PELAWAAN'] = pd.to_datetime(df['TARIKH_PELAWAAN'], format='%d/%m/%Y')
    
    current_date = datetime.now()
    current_month = current_date.month
    previous_month = (current_date.replace(day=1) - pd.DateOffset(months=1)).month
    current_year = current_date.year
    
     # Filter by current year and respective month
    current_month_count = df[(df['TARIKH_PELAWAAN'].dt.month == current_month) &
                             (df['TARIKH_PELAWAAN'].dt.year == current_year)].shape[0]

    previous_month_count = df[(df['TARIKH_PELAWAAN'].dt.month == previous_month) &
                              (df['TARIKH_PELAWAAN'].dt.year == current_year)].shape[0]
    
    # Calculate the percentage difference
    if previous_month_count != 0:
        percentage_difference = ((current_month_count - previous_month_count) / previous_month_count) * 100
        percentage_difference = round(percentage_difference, 2)
    else:
        # Handle the case where the previous month's count is 0 to avoid division by zero
        percentage_difference = float('inf') if current_month_count > 0 else 0

    if percentage_difference > 0:
        status = 'positive'
    elif percentage_difference < 0:
        status = 'negative'
    else:
        status = 'no change'

    # Return the result
    return jsonify({
        'current_month_count': current_month_count,
        'percentage_difference': percentage_difference,
        'status': status
    })
    
@app.route('/compare-months', methods=['GET'])
def compare_months():
    df = pd.read_csv('output_with_location.csv')

    # Ensure the date column is in datetime format
    df['TARIKH PAPARAN KEPUTUSAN'] = pd.to_datetime(df['TARIKH PAPARAN KEPUTUSAN'], format='%d/%m/%Y')

    # Get current and previous month and the current year
    current_date = datetime.now()
    current_month = 8
    previous_month = 7
    current_year = current_date.year

    # Filter by current year and respective month
    current_month_count = df[(df['TARIKH PAPARAN KEPUTUSAN'].dt.month == current_month) &
                             (df['TARIKH PAPARAN KEPUTUSAN'].dt.year == current_year)].shape[0]

    previous_month_count = df[(df['TARIKH PAPARAN KEPUTUSAN'].dt.month == previous_month) &
                              (df['TARIKH PAPARAN KEPUTUSAN'].dt.year == current_year)].shape[0]

    # Calculate the percentage difference
    if previous_month_count != 0:
        percentage_difference = ((current_month_count - previous_month_count) / previous_month_count) * 100
        percentage_difference = round(percentage_difference, 2)
    else:
        # Handle the case where the previous month's count is 0 to avoid division by zero
        percentage_difference = float('inf') if current_month_count > 0 else 0

    if percentage_difference > 0:
        status = 'positive'
    elif percentage_difference < 0:
        status = 'negative'
    else:
        status = 'no change'

    # Return the result
    return jsonify({
        'current_month_count': current_month_count,
        'percentage_difference': percentage_difference,
        'status': status
    })

@app.route('/top-state', methods=['GET'])
def top_state():
    df = pd.read_csv('output_with_location.csv')

    # List of states in Malaysia
    states = [
        'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang',
        'Penang', 'Perak', 'Perlis', 'Selangor', 'Terengganu', 'Kuala Lumpur',
        'Labuan', 'Putrajaya', 'Sarawak', 'Sabah'
    ]

    # Function to find state in address
    def extract_state(address):
        if isinstance(address, str):  
            address = address.lower()
            for state in states:
                if state.lower() in address:
                    return state
        return 'Unknown'

    # Apply function to create a new column with the state
    df['State'] = df['ALAMAT PETENDER BERJAYA'].apply(extract_state)

    # Filter out 'Unknown' state
    df_filtered = df[df['State'] != 'Unknown']

    # Get current and previous month and the current year
    current_date = datetime.now()
    current_month = 8
    previous_month = 7
    current_year = current_date.year
    
    df_filtered['TARIKH PAPARAN KEPUTUSAN'] = pd.to_datetime(df_filtered['TARIKH PAPARAN KEPUTUSAN'], format='%d/%m/%Y')

    # Filter data by current year and month
    current_month_df = df_filtered[(df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.month == current_month) &
                                   (df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.year == current_year)]

    previous_month_df = df_filtered[(df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.month == previous_month) &
                                    (df_filtered['TARIKH PAPARAN KEPUTUSAN'].dt.year == current_year)]

    # Count occurrences of each state in the current and previous month
    current_state_counts = current_month_df['State'].value_counts()
    previous_state_counts = previous_month_df['State'].value_counts()

    # Find the top state in the current month
    if not current_state_counts.empty:
        top_state = current_state_counts.idxmax()
        top_state_count = current_state_counts.max()

        # Get the count of the same state in the previous month
        previous_state_count = previous_state_counts.get(top_state, 0)

        # Calculate the percentage difference
        if previous_state_count != 0:
            percentage_difference = ((top_state_count - previous_state_count) / previous_state_count) * 100
            percentage_difference = round(percentage_difference, 2)
        else:
            percentage_difference = float('inf') if top_state_count > 0 else 0

        if percentage_difference > 0:
            status = 'positive'
        elif percentage_difference < 0:
            status = 'negative'
        else:
            status = 'no change'
    else:
        top_state = 'None'
        top_state_count = 0
        percentage_difference = 0
        status = 'no data'

    return jsonify({
        'state': top_state,
        'count': int(top_state_count),  # Convert to int
        'percentage_difference': percentage_difference,
        'status': status
    })

@app.route('/top-ministry', methods=['GET'])
def top_ministry():
    df = pd.read_csv('output_with_location.csv')

    # Count occurrences of each ministry/agency
    ministry_counts = df['KEMENTERIAN / AGENSI'].value_counts()

    # Find the ministry/agency with the highest number of contracts
    top_ministry = ministry_counts.idxmax()
    top_ministry_count = ministry_counts.max()

    return jsonify({
        'ministry': top_ministry,
        'count': int(top_ministry_count)  # Convert to int for JSON serialization
    })

@app.route('/top-companies', methods=['GET'])
def top_companies():
    df = pd.read_csv('output_with_location.csv')
    
    # Count occurrences of each company in the 'PETENDER BERJAYA' column
    company_counts = df['PETENDER BERJAYA'].value_counts()

    # Get query parameters for range
    min_range = int(request.args.get('minRange', 1))  
    max_range = int(request.args.get('maxRange', 5)) 

    # Ensure the ranges are within the bounds
    min_range = max(1, min_range)  
    max_range = min(len(company_counts), max_range)

    # Slice the series to get only the desired range
    top_companies_slice = company_counts.iloc[min_range-1:max_range]

    # Convert the result to a dictionary to send as JSON
    top_companies = {
        'companies': top_companies_slice.index.tolist(),
        'counts': top_companies_slice.values.tolist()
    }

    return jsonify(top_companies)

@app.route('/current-tenders', methods=['GET'])
def get_current_tenders():
    # Load the CSV file
    df = pd.read_csv('Merged_Dataset.csv')

    # Select the required columns
    selected_columns = df[[
        'NOMBOR_TENDER', 
        'TAJUK_TENDER', 
        'TARIKH_TUTUP_PELAWAAN', 
        'KATEGORI_PEROLEHAN', 
        'TARIKH_PELAWAAN', 
        'KEMENTERIAN_AGENSI', 
        'HARGA_INDIKATIF_JABATAN'
    ]]

    # Rename columns for better readability in the frontend
    selected_columns = selected_columns.rename(columns={
        'NOMBOR_TENDER': 'Tender ID',
        'TAJUK_TENDER': 'Project Name',
        'TARIKH_TUTUP_PELAWAAN': 'Closing Date',
        'KATEGORI_PEROLEHAN': 'Eligibility Criteria',
        'TARIKH_PELAWAAN': 'Region',
        'KEMENTERIAN_AGENSI': 'Contracting Agency',
        'HARGA_INDIKATIF_JABATAN': 'Contact Person'
    })

    # Replace NaN values with None
    selected_columns = selected_columns.where(pd.notnull(selected_columns), None).head(10)

    # Convert the DataFrame to a list of dictionaries
    tenders = selected_columns.to_dict(orient='records')

    # Return the data as JSON
    return jsonify(tenders)

@app.route('/get_tender_advertisement', methods=['GET'])
def get_tender_advertisement():
     # Load the CSV file
    df = pd.read_csv('Merged_Dataset.csv')

    # Select the required columns
    selected_columns = df[[
        'NOMBOR_TENDER', 
        'TAJUK_TENDER', 
        'TARIKH_TUTUP_PELAWAAN', 
        'KATEGORI_PEROLEHAN', 
        'TARIKH_PELAWAAN', 
        'KEMENTERIAN_AGENSI', 
        'HARGA_INDIKATIF_JABATAN'
    ]]

    # Rename columns for better readability in the frontend
    selected_columns = selected_columns.rename(columns={
        'NOMBOR_TENDER': 'Tender ID',
        'TAJUK_TENDER': 'Project Name',
        'TARIKH_TUTUP_PELAWAAN': 'Closing Date',
        'KATEGORI_PEROLEHAN': 'Eligibility Criteria',
        'TARIKH_PELAWAAN': 'Region',
        'KEMENTERIAN_AGENSI': 'Contracting Agency',
        'HARGA_INDIKATIF_JABATAN': 'Contact Person'
    })

    # Replace NaN values with None
    selected_columns = selected_columns.where(pd.notnull(selected_columns), None)
    
    # Convert the DataFrame to a list of dictionaries
    tenders = selected_columns.to_dict(orient='records')

    # Return the data as JSON
    return jsonify(tenders)

@app.route('/get_tender_advertisement_year', methods=['GET'])
def get_tender_advertisement_year():
     # Load the CSV file
    df = pd.read_csv('Merged_Dataset.csv')
    
    df['TARIKH_TUTUP_PELAWAAN'] = pd.to_datetime(df['TARIKH_TUTUP_PELAWAAN'], format='%d/%m/%Y')

    df['Year'] = df['TARIKH_TUTUP_PELAWAAN'].dt.year
    
    years = sorted(df['Year'].dropna().unique().tolist(), reverse=True)
    print(years)
    # Return the data as JSON
    return jsonify(years)

# Define the route for the heatmap
@app.route('/heatmap')
def display_heatmap():
    return send_file(r'heatmap.html')

if __name__ == '__main__':
    app.run(debug=True)