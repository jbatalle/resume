require 'pdfkit'

# PDFKit.new takes the HTML and any options for wkhtmltopdf
# run `wkhtmltopdf --extended-help` for a full list of options

PDFKit.configure do |config|
  config.default_options = {
    :page_size => 'A4',
	:encoding=>"UTF-8",
    :print_media_type => true,
	:margin_top => '0.39in',
    :margin_right => '0.86in',
    :margin_bottom => '0.39in',
    :margin_left => '0.86in'
  }
end

kit = PDFKit.new(File.new('index.html'))
#kit.stylesheets << 'assets/bootstrap.min.css'

# Get an inline PDF
pdf = kit.to_pdf

date = "#{Time.now.year}-#{Time.now.month}-#{Time.now.day}"
# Save the PDF to a file
file = kit.to_file('josep_batalle_cv_'+date+'.pdf')


