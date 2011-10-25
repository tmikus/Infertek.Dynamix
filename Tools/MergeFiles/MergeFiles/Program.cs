using System;
using System.Collections.Generic;
using System.IO;

namespace MergeFiles
{
	class Program
	{
		static void Main(string[] args)
		{
			var inputFilesList = new List<string>();
			var outputFileName = "output.merge";

			var isSelectingOutputFile = false;
			foreach (var currentArgument in args)
			{
				if(isSelectingOutputFile)
				{
					outputFileName = currentArgument;
					isSelectingOutputFile = false;
				}
				else if(currentArgument == "-o")
				{
					isSelectingOutputFile = true;
				}
				else
				{
					inputFilesList.Add(currentArgument);
				}
			}

			if(inputFilesList.Count == 0)
			{
				Console.WriteLine("No input file specified!");
				return;
			}
			
			using (var outputFileWriter = new StreamWriter(new FileStream(outputFileName, FileMode.Create)))
			{
				foreach(var inputFile in inputFilesList)
				{
					var inputFileReader = new StreamReader(inputFile);
					outputFileWriter.Write(inputFileReader.ReadToEnd());
					outputFileWriter.Write(outputFileWriter.NewLine);
				}
			}
		}
	}
}
