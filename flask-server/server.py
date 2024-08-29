from flask import Flask, jsonify
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# @app.route('/current-tender',methods=['GET'])
# def current_tendenr():
#     df = 
@app.route('/compare-months', methods=['GET'])
def compare_months():
    df = pd.read_csv('MasterDataset_Unique.csv')

    # Ensure the date column is in datetime format
    df['TARIKH PAPARAN KEPUTUSAN'] = pd.to_datetime(df['TARIKH PAPARAN KEPUTUSAN'], format='%d/%m/%Y')

    # Get current and previous month
    current_month = datetime.now().month
    previous_month = (datetime.now().replace(day=1) - pd.DateOffset(months=1)).month

    # Filter by month
    current_month_count = df[df['TARIKH PAPARAN KEPUTUSAN'].dt.month == current_month].shape[0]
    previous_month_count = df[df['TARIKH PAPARAN KEPUTUSAN'].dt.month == previous_month].shape[0]

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
    df = pd.read_csv('MasterDataset_Unique.csv')
    
    # List of states in Malaysia
    states = [
        'Kedah', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang',
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

    # Count occurrences of each state
    state_counts = df_filtered['State'].value_counts()

    # Find the state with the highest number of contracts
    if not state_counts.empty:
        top_state = state_counts.idxmax()
        top_state_count = state_counts.max()
    else:
        top_state = 'None'
        top_state_count = 0

    return jsonify({
        'state': top_state,
        'count': int(top_state_count)  # Convert to int
    })

@app.route('/top-ministry', methods=['GET'])
def top_ministry():
    df = pd.read_csv('MasterDataset_Unique.csv')

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
    df = pd.read_csv('MasterDataset_Unique.csv')
    
    # Count occurrences of each company in the 'PETENDER BERJAYA' column
    company_counts = df['PETENDER BERJAYA'].value_counts().head(5)

    # Convert the result to a dictionary to send as JSON
    top_companies = {
        'companies': company_counts.index.tolist(),
        'counts': company_counts.values.tolist()
    }

    return jsonify(top_companies)

if __name__ == '__main__':
    app.run(debug=True)